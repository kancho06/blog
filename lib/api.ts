import path from "path";
import fs from "fs";
import matter from "gray-matter";
import dayjs from "dayjs";
import * as mdx from "../lib/mdx";

/*
 * getStaticProps API
 */

export function getAllMdxData(type: mdx.DataType): mdx.MdxData[] {
    const dir = (() => {
        if (type === "tech") {
            return mdx.TECH_FILE_PATH;
        }
        return mdx.ALGORITHM_FILE_PATH;
    })();
    const paths = mdx.getPaths(dir);
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
                return bCreatedAt - aCreatedAt;
            }
            return b.data.id - a.data.id;
        });
}

export async function getDetailMdxData(type: mdx.DataType, id: string): Promise<mdx.DetailMdxData> {
    const path = (() => {
        if (type === "tech") {
            return mdx.TECH_DETAIL_FILE_PATH(id);
        }
        return mdx.ALGORITHM_DETAIL_FILA_PATH(id);
    })();
    const src = fs.readFileSync(path);
    const { content, data } = matter(src);
    const mdxSrc = await mdx.serializeMdx(content);
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
        mdxSrc,
    };
}

export function getAllSeriesMdxData(type: mdx.DataType): mdx.MdxData[] {
    const dir = (() => {
        if (type === "tech") {
            return mdx.TECH_FILE_PATH;
        }
        return mdx.ALGORITHM_FILE_PATH;
    })();
    const paths = mdx.getPaths(dir);
    const src = paths.map((filePath) => {
        const src = fs.readFileSync(path.join(dir, filePath), {
            encoding: "utf8",
        });
        return matter(src);
    });
    const seriesSrc = src.filter((s) => {
        return !!(s.data.seriesId && s.data.seriesTitle);
    });
    if (!seriesSrc.length) {
        return [];
    }
    // 중복제거를 하기전에 정렬하여 가장 첫번째 게시물이 남도록 유도한다.
    const sorted = seriesSrc.sort((a, b) => {
        const aCreatedAt = dayjs(a.data.createdAt).valueOf();
        const bCreatedAt = dayjs(b.data.createdAt).valueOf();
        if (aCreatedAt !== bCreatedAt) {
            return bCreatedAt - aCreatedAt;
        }
        return b.data.id - a.data.id;
    });
    const series = [...new Map(sorted.map((m) => [m.data.seriesId, m])).values()].sort((a, b) => {
        return a.data.seriesId - b.data.seriesId;
    });
    return series.map((src) => {
        const { content, data } = src;
        const href = (() => {
            if (type === "tech") {
                return `/series/${data.seriesId}/tech`;
            }
            return `/series/${data.seriesId}/algorithm`;
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
    });
}

export function getDetailSeriesMdxData(type: mdx.DataType, seriesId: string): mdx.MdxData[] {
    const dir = (() => {
        if (type === "tech") {
            return mdx.TECH_FILE_PATH;
        }
        return mdx.ALGORITHM_FILE_PATH;
    })();
    const paths = mdx.getPaths(dir);
    const src = paths.map((filePath) => {
        const src = fs.readFileSync(path.join(dir, filePath), {
            encoding: "utf8",
        });
        return matter(src);
    });
    const seriesSrc = src.filter((s) => {
        return !!(s.data.seriesId && s.data.seriesTitle);
    });
    if (!seriesSrc.length) {
        return [];
    }
    const targetSeries = seriesSrc.filter((s) => {
        return seriesId === s.data.seriesId.toString();
    });
    return (
        targetSeries
            .map((src) => {
                const { content, data } = src;
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
            // series ASC 정렬
            .sort((a, b) => {
                const aCreatedAt = dayjs(a.data.createdAt).valueOf();
                const bCreatedAt = dayjs(b.data.createdAt).valueOf();
                if (aCreatedAt !== bCreatedAt) {
                    return aCreatedAt - bCreatedAt;
                }
                return a.data.id - b.data.id;
            })
    );
}

/*
 * getStaticPaths API
 */

export function getStaticAllMdxPaths(type: mdx.DataType) {
    const dir = (() => {
        if (type === "tech") {
            return mdx.TECH_FILE_PATH;
        }
        return mdx.ALGORITHM_FILE_PATH;
    })();
    const filePaths = mdx.getPaths(dir);
    return filePaths.map((path) => path.replace(/\.mdx?$/, "")).map((id) => ({ params: { id } }));
}

export function getStaticAllSeriesMdxPaths() {
    const paths: { params: { id: string; type: mdx.DataType } }[] = [];
    ["tech", "algorithm"].forEach((type: mdx.DataType) => {
        const dir = (() => {
            if (type === "tech") {
                return mdx.TECH_FILE_PATH;
            }
            return mdx.ALGORITHM_FILE_PATH;
        })();
        const filePaths = mdx.getPaths(dir);
        const src = filePaths.map((filePath) => {
            const src = fs.readFileSync(path.join(dir, filePath), {
                encoding: "utf8",
            });
            return matter(src);
        });
        const seriesSrc = src.filter((s) => {
            return !!(s.data.seriesId && s.data.seriesTitle);
        });
        if (!seriesSrc.length) {
            return [];
        }
        // 중복제거를 하기전에 정렬하여 가장 첫번째 게시물이 남도록 유도한다.
        const sorted = seriesSrc.sort((a, b) => {
            const aCreatedAt = dayjs(a.data.createdAt).valueOf();
            const bCreatedAt = dayjs(b.data.createdAt).valueOf();
            if (aCreatedAt !== bCreatedAt) {
                return bCreatedAt - aCreatedAt;
            }
            return b.data.id - a.data.id;
        });
        const series = [...new Map(sorted.map((m) => [m.data.seriesId, m])).values()];

        series.forEach((s) => {
            paths.push({
                params: {
                    id: s.data.seriesId.toString(),
                    type,
                },
            });
        });
    });
    return paths;
}
