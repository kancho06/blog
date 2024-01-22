import path from "path";
import fs from "fs";
import matter from "gray-matter";
import { serialize } from "next-mdx-remote/serialize";
import { MDXRemoteSerializeResult } from "next-mdx-remote";
import { DailyCategory, TechCategory } from "../types/mdxTypes";
import rehypeImgSize from "rehype-img-size";
import dayjs from "dayjs";

export interface FrontMatter {
    id: number;
    title: string;
    type: DataType;
    category: TechCategory | DailyCategory;
    seriesId: number | null;
    seriesTitle: string | null;
    author: string;
    createdAt: string; // YYYY-MM-DD;
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

export type DataType = "tech" | "algorithm";

export const TECH_FILE_PATH = path.join(process.cwd(), "data/tech");
export const ALGORITHM_FILE_PATH = path.join(process.cwd(), "data/algorithm");
export const TECH_DETAIL_FILE_PATH = (id: string) => path.join(process.cwd(), `data/tech/${id}.mdx`);
export const ALGORITHM_DETAIL_FILA_PATH = (id: string) => path.join(process.cwd(), `data/algorithm/${id}.mdx`);

export const getPaths = (filePath: string) => {
    return fs.readdirSync(filePath).filter((path) => /\.mdx?$/.test(path));
};

export function getAllMdxData(type: DataType): MdxData[] {
    const dir = (() => {
        if (type === "tech") {
            return TECH_FILE_PATH;
        }
        return ALGORITHM_FILE_PATH;
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
                return `/algorithm/${data.id}/detail`;
            })();
            return {
                content,
                data: {
                    id: data.id,
                    title: data.title,
                    type: type,
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
            const aCreatedAt = dayjs(a.data.createdAt).valueOf();
            const bCreatedAt = dayjs(b.data.createdAt).valueOf();
            if (aCreatedAt !== bCreatedAt) {
                return aCreatedAt - bCreatedAt;
            }
            return a.data.id - b.data.id;
        });
}

export async function getDetailMdxData(type: DataType, id: string): Promise<DetailMdxData> {
    const path = (() => {
        if (type === "tech") {
            return TECH_DETAIL_FILE_PATH(id);
        }
        return ALGORITHM_DETAIL_FILA_PATH(id);
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
            // [rehypeImageSize, { root: process.cwd() + `/public/${type}/` + id }]
            rehypePlugins: [[rehypeImgSize, { dir: "public" }]],
            format: "mdx",
        },
        // Indicates whether or not to parse the frontmatter from the mdx source
        parseFrontmatter: false,
    });
    const href = (() => {
        if (type === "tech") {
            return `/tech/${data.id}/detail`;
        }
        return `/algorithm/${data.id}/detail`;
    })();
    return {
        content,
        data: {
            id: data.id,
            title: data.title,
            type: type,
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

export function getRecentMdxData() {}
