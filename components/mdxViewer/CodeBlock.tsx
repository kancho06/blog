import React from "react";
import Prism from "prismjs";
import { Highlight, themes, Language, Prism as PrismRR } from "prism-react-renderer";
import styled from "styled-components";
(typeof global !== "undefined" ? global : window).Prism = Prism;
import "prismjs/components/prism-typescript.js";
import "prismjs/components/prism-bash.js";
import "prismjs/components/prism-java.js";
import CopyButton from "./CopyButton";

const Container = styled.div`
    width: 100%;
    position: relative;
`;

const CodeButtonWrapper = styled.div`
    position: absolute;
    top: 10px;
    right: 10px;
`;

interface Props {
    children: string;
    className: string;
}

type PrismLib = typeof PrismRR & typeof Prism; //

const CodeBlock: React.FC<Props> = (props) => {
    const { children, className } = props;
    const language = className ? className.replace(/language-/, "") : "bash";
    return (
        <Container>
            <Highlight prism={Prism as PrismLib} theme={themes.oneDark} code={children} language={language as Language}>
                {({ className, style, tokens, getLineProps, getTokenProps }) => (
                    <pre className={className} style={{ ...style, borderRadius: "0 0 8px 8px", padding: "10px", minHeight: "50px" }}>
                        {/*
                            last token is empty line
                        */}
                        {tokens.slice(0, tokens.length - 1).map((line, i) => (
                            <div key={i} {...getLineProps({ line, key: i })}>
                                {line.map((token, key) => (
                                    <span key={key} {...getTokenProps({ token, key })} />
                                ))}
                            </div>
                        ))}
                        <CodeButtonWrapper>
                            <CopyButton text={children} />
                        </CodeButtonWrapper>
                    </pre>
                )}
            </Highlight>
        </Container>
    );
};

export default CodeBlock;
