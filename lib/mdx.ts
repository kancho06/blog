import { serialize } from "next-mdx-remote/serialize";
import rehypeImgSize from "rehype-img-size";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeCodeTitles from "rehype-code-titles";
import remarkBreaks from "remark-breaks";
import path from "path";
import fs from "fs";
import { AlgorithmCategory, TechCategory } from "../types/mdxTypes";
import { MDXRemoteSerializeResult } from "next-mdx-remote";

export interface FrontMatter {
    id: number;
    title: string;
    type: DataType;
    category: TechCategory | AlgorithmCategory;
    seriesId: number | null;
    seriesTitle: string | null;
    author: string;
    createdAt: string; // YYYY-MM-DD HH:mm
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

export async function serializeMdx(content: string) {
    return await serialize(content, {
        // made available to the arguments of any custom mdx component
        scope: {},
        // MDX's available options, see the MDX docs for more info.
        // https://mdxjs.com/packages/mdx/#compilefile-options
        mdxOptions: {
            remarkPlugins: [remarkGfm, remarkBreaks],
            // [rehypeImageSize, { root: process.cwd() + `/public/${type}/` + id }]
            rehypePlugins: [
                rehypeSlug,
                rehypeCodeTitles,
                [
                    rehypeAutolinkHeadings,
                    {
                        properties: {
                            className: ["anchor"],
                        },
                    },
                ],
                // type error
                // https://github.com/hashicorp/next-mdx-remote/issues/86
                [rehypeImgSize, { dir: "public" }] as any,
            ],
            format: "mdx",
        },
        // Indicates whether or not to parse the frontmatter from the mdx source
        parseFrontmatter: true,
    });
}
