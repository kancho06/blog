import React from "react";
import CodeBlock from "./CodeBlock";
import "github-markdown-css";
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import { MDXComponents } from "mdx/types";
import Image from "next/image";
import * as url from "../../lib/url";

interface Props {
    children: MDXRemoteSerializeResult<Record<string, unknown>, Record<string, unknown>>;
}

const mdxComponents: MDXComponents = {
    code: CodeBlock,
    img: (props: any) => <Image {...props} src={url.resolvePath(props.src)} />,
};

const MdxViewer: React.FC<Props> = (props) => {
    const { children } = props;
    return (
        <>
            <style jsx>
                {`
                    .markdown-body {
                        padding: 20px;
                    }
                `}
            </style>
            <div className="markdown-light-body">
                <MDXRemote {...children} components={mdxComponents} />
            </div>
        </>
    );
};

export default MdxViewer;
