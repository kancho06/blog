import path from "path";
import fs from "fs";
import matter from "gray-matter";
import { serialize } from "next-mdx-remote/serialize";
import { MDXRemoteSerializeResult } from "next-mdx-remote";

type DataCategory = "tech" | "daily";

export interface TechData {
    content: string;
    data: {
        id: number;
        title: string;
        category: DataCategory;
        author: string;
        createdAt: string; // YYYY.MM.DD
        description: string;
    };
    filePath: string;
}

export interface DetailTechData extends TechData {
    mdxSrc: MDXRemoteSerializeResult<Record<string, unknown>, Record<string, unknown>>;
}

export const TECH_FILE_PATH = path.join(process.cwd(), "data/tech");
const TECH_DETAIL_FILE_PATH = (id: string) => path.join(process.cwd(), `data/tech/${id}.mdx`);

export const getPaths = (filePath: string) => {
    return fs.readdirSync(filePath).filter((path) => /\.mdx?$/.test(path));
};

export function getAllTechData(): TechData[] {
    const paths = getPaths(TECH_FILE_PATH);
    return paths
        .map((filePath) => {
            const src = fs.readFileSync(path.join(TECH_FILE_PATH, filePath), {
                encoding: "utf8",
            });
            const { content, data } = matter(src);
            return {
                content,
                data: {
                    id: data.id,
                    title: data.title,
                    category: data.category,
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

export async function getTechData(id: string): Promise<DetailTechData> {
    const path = TECH_DETAIL_FILE_PATH(id);
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
            author: data.author,
            createdAt: data.createdAt,
            description: data.description,
        },
        filePath: path,
        mdxSrc: mdxSrc,
    };
}
