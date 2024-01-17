import React from "react";
import CodeBlock from "./CodeBlock";
import { MDXProvider } from "@mdx-js/react";
import "github-markdown-css";
import { MDXComponents } from "mdx/types";

interface Props {
    children: React.ReactNode;
}

const mdxComponents = {
    code: CodeBlock,
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
            <MDXProvider components={mdxComponents as MDXComponents}>
                <div className="markdown-light-body">{children}</div>
            </MDXProvider>
        </>
    );
};

export default MdxViewer;
