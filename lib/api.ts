import path from "path";
import fs from "fs";
import matter from "gray-matter";
import { serialize } from "next-mdx-remote/serialize";
import { MDXRemoteSerializeResult } from "next-mdx-remote";
import { DailyCategory, TechCategory } from "../types/mdxTypes";

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
    filePath: string;
}

export interface DetailMdxData extends MdxData {
    mdxSrc: MDXRemoteSerializeResult<Record<string, unknown>, Record<string, unknown>>;
}

export const TECH_FILE_PATH = path.join(process.cwd(), "data/tech");
export const DAILY_FILE_PATH = path.join(process.cwd(), "data/daily");
export const TECH_DETAIL_FILE_PATH = (id: string) => path.join(process.cwd(), `data/tech/${id}.mdx`);
export const DAILY_DETAIL_FILA_PATH = (id: string) => path.join(process.cwd(), `data/daily/${id}.mdx`);

export const getPaths = (filePath: string) => {
    return fs.readdirSync(filePath).filter((path) => /\.mdx?$/.test(path));
};

export function getAllMdxData(dirPath: string): MdxData[] {
    console.info("dirpath => ", dirPath);
    const paths = getPaths(dirPath);
    return paths
        .map((filePath) => {
            const src = fs.readFileSync(path.join(dirPath, filePath), {
                encoding: "utf8",
            });
            const { content, data } = matter(src);
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
                filePath,
            };
        })
        .sort((a, b) => {
            return a.data.id - b.data.id;
        });
}

export async function getDetailMdxData(path: string): Promise<DetailMdxData> {
    const src = fs.readFileSync(path);
    const { content, data } = matter(src);
    const mdxSrc = await serialize(content, {
        // made available to the arguments of any custom mdx component
        scope: {},
        // MDX's available options, see the MDX docs for more info.
        // https://mdxjs.com/packages/mdx/#compilefile-options
        mdxOptions: {
            remarkPlugins: [],
            rehypePlugins: [],
            format: "mdx",
        },
        // Indicates whether or not to parse the frontmatter from the mdx source
        parseFrontmatter: false,
    });
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
        filePath: path,
        mdxSrc: mdxSrc,
    };
}
