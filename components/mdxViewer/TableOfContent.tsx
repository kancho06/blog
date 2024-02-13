import React, { useState } from "react";
import styled from "styled-components";
import colors from "../../lib/color";
import { useIntersectionObserver } from "../../lib/useIntersectionObserver";

const Container = styled.div`
    width: 100%;
    border: 2px solid ${colors.black};
    padding: 15px;
    border-radius: 8px;
    transition: all 0.1s;
    background-color: ${colors.white};
    :hover {
        transform: scale(1.1);
    }
`;

const Label = styled.div`
    font-size: 20px;
    color: ${colors.black};
    font-weight: bold;
    margin-bottom: 15px;
`;

const CustomUl = styled.div``;

const Title = styled.li<{
    fontSize: number;
    active: boolean;
    paddingLeft: number;
}>`
    color: ${colors.black};
    font-size: ${(props) => props.fontSize}px;
    font-weight: ${(props) => (props.active ? "bold" : "400")};
    padding-left: ${(props) => props.paddingLeft}px;
    cursor: pointer;
    margin-bottom: 10px;
    list-style-type: none;
    :hover {
        color: ${colors.red};
    }
    :last-child {
        margin-bottom: 0;
    }
`;

interface Props {
    content: string;
}

// 기본적으로 ##부터 사용하기 때문에 #에 대한 대응은 ##과 같은 취급을 한다
const getHeadings = (content: string) => {
    const regex = /^(#|##|###|####) (.*$)/gim;
    if (content.match(regex)) {
        return content.match(regex)?.map((heading: string) => ({
            text: heading.replace(/#/g, "").trim(),
            link: heading.replace(/#/g, "").trim().replace(/ /g, "-").toLowerCase().replace(/[?!]/g, ""),
            indent: heading.match(/#/g)?.length,
        }));
    }
    return [];
};

const getPaddingLeft = (indent: number) => {
    if (indent === 1 || indent === 2) {
        return 0;
    }
    return (indent - 1) * 10;
};

const TableOfContent: React.FC<Props> = (props) => {
    const { content } = props;
    const [activeId, setActivId] = useState<string>("");
    useIntersectionObserver(setActivId, content);
    const headings = getHeadings(content);
    return (
        <Container>
            <Label>Table of Contents</Label>
            <CustomUl>
                {headings?.map((h, i) => {
                    return (
                        <Title
                            key={i}
                            fontSize={16}
                            active={activeId === h.link}
                            paddingLeft={getPaddingLeft(h.indent!)}
                            onClick={() => {
                                setActivId(h.link);
                                const target = document.getElementById(h.link);
                                if (target) {
                                    // menu margin
                                    const yOffset = -60;
                                    const y = target.getBoundingClientRect().top + window.pageYOffset + yOffset;
                                    window.scrollTo({ top: y, behavior: "smooth" });
                                }
                            }}
                        >
                            {h.text}
                        </Title>
                    );
                })}
            </CustomUl>
        </Container>
    );
};

export default TableOfContent;
