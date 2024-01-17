import React from "react";
import { Highlight, themes, Language } from "prism-react-renderer";
import styled from "styled-components";

const Container = styled.div``;

interface Props {
    children: string;
    className: string;
}

const CodeBlock: React.FC<Props> = (props) => {
    const { children, className } = props;
    const language = className.replace(/language-/, "");
    return (
        <Container>
            <Highlight theme={themes.duotoneLight} code={children} language={language as Language}>
                {({ className, style, tokens, getLineProps, getTokenProps }) => (
                    <pre className={className} style={{ ...style }}>
                        {tokens.map((line, i) => (
                            <div key={i} {...getLineProps({ line, key: i })}>
                                {line.map((token, key) => (
                                    <span key={key} {...getTokenProps({ token, key })} />
                                ))}
                            </div>
                        ))}
                    </pre>
                )}
            </Highlight>
        </Container>
    );
};

export default CodeBlock;
