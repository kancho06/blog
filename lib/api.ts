import path from "path";
import fs from "fs";
import matter from "gray-matter";
import { serialize } from "next-mdx-remote/serialize";
import { MDXRemoteSerializeResult } from "next-mdx-remote";
import { DailyCategory, TechCategory } from "../types/mdxTypes";
import rehypeImageSize from "./rehypeImageSize";

export interface FrontMatter {
    id: number;
    title: string;
    category: TechCategory | DailyCategory;
    seriesId: number | null;
    seriesTitle: string | null;
    author: string;
    createdAt: string; // YYYY.MM.DD
    description: string;
}

export interface MdxData {
    content: string;
    data: FrontMatter;
    href: string;
}

export interface DetailMdxData extends MdxData {
    mdxSrc: MDXRemoteSerializeResult<Record<string, unknown>, Record<string, unknown>>;
}

export type DataType = "tech" | "daily";

export const TECH_FILE_PATH = path.join(process.cwd(), "data/tech");
export const DAILY_FILE_PATH = path.join(process.cwd(), "data/daily");
export const TECH_DETAIL_FILE_PATH = (id: string) => path.join(process.cwd(), `data/tech/${id}.mdx`);
export const DAILY_DETAIL_FILA_PATH = (id: string) => path.join(process.cwd(), `data/daily/${id}.mdx`);

export const getPaths = (filePath: string) => {
    return fs.readdirSync(filePath).filter((path) => /\.mdx?$/.test(path));
};

export function getAllMdxData(type: DataType): MdxData[] {
    const dir = (() => {
        if (type === "tech") {
            return TECH_FILE_PATH;
        }
        return DAILY_FILE_PATH;
    })();
    const paths = getPaths(dir);
    return paths
        .map((filePath) => {
            const src = fs.readFileSync(path.join(dir, filePath), {
                encoding: "utf8",
            });
            const { content, data } = matter(src);
            const href = (() => {
                if (type === "tech") {
                    return `/tech/${data.id}/detail`;
                }
                return `/daily/${data.id}/detail`;
            })();
            return {
                content,
                data: {
                    id: data.id,
                    title: data.title,
                    category: data.category,
                    seriesId: data.seriesId ? data.seriesId : null,
                    seriesTitle: data.seriesTitle ? data.seriesTitle : null,
                    author: data.author,
                    createdAt: data.createdAt,
                    description: data.description,
                },
                href,
            };
        })
        .sort((a, b) => {
            return a.data.id - b.data.id;
        });
}

export async function getDetailMdxData(type: DataType, id: string): Promise<DetailMdxData> {
    const path = (() => {
        if (type === "tech") {
            return TECH_DETAIL_FILE_PATH(id);
        }
        return DAILY_DETAIL_FILA_PATH(id);
    })();
    const src = fs.readFileSync(path);
    const { content, data } = matter(src);
    const mdxSrc = await serialize(content, {
        // made available to the arguments of any custom mdx component
        scope: {},
        // MDX's available options, see the MDX docs for more info.
        // https://mdxjs.com/packages/mdx/#compilefile-options
        mdxOptions: {
            remarkPlugins: [],
            rehypePlugins: [[rehypeImageSize, { root: process.cwd() + `/public/${type}/` + id }]],
            format: "mdx",
        },
        // Indicates whether or not to parse the frontmatter from the mdx source
        parseFrontmatter: false,
    });
    const href = (() => {
        if (type === "tech") {
            return `/tech/${data.id}/detail`;
        }
        return `/daily/${data.id}/detail`;
    })();
    return {
        content,
        data: {
            id: data.id,
            title: data.title,
            category: data.category,
            seriesId: data.seriesId ? data.seriesId : null,
            seriesTitle: data.seriesTitle ? data.seriesTitle : null,
            author: data.author,
            createdAt: data.createdAt,
            description: data.description,
        },
        href,
        mdxSrc: mdxSrc,
    };
}
