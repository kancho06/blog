import React, { useRef } from "react";
import styled from "styled-components";
import { MdxData } from "../lib/mdx";
import colors from "../lib/color";
import Link from "next/link";
import dayjs from "dayjs";

const Container = styled.div`
    width: 250px;
    height: 300px;
    position: relative;
`;

const Title = styled.div`
    width: 80%;
    text-align: center;
    font-size: 16px;
    color: ${colors.black};
    font-weight: bold;
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    word-break: break-all;
`;

const Category = styled.div`
    font-size: 13px;
    color: ${colors.grey};
`;

const CreatedAt = styled.div`
    font-size: 13px;
    color: ${colors.grey};
`;

const CardLink = styled(Link)`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-radius: 8px;
    gap: 15px;
    z-index: 100;
    background-color: ${colors.white};
    transition: all 0.08s;
`;

const CardOverlay = styled.div`
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: 1000;
    cursor: pointer;
    top: 0;
    left: 0;
    transition: all 0.08s;
`;

const CardUnderlay = styled.div`
    width: 100%;
    height: 100%;
    z-index: -1;
    position: absolute;
    top: 0;
    left: 0;
    border: 2px solid ${colors.black};
    border-radius: 8px;
    transition:
        box-shadow 0.4s ease,
        opacity 0.33s ease-out;
    box-shadow:
        0 0 3px -1px transparent,
        0 0 2px 1px transparent,
        0 0 5px 0px transparent,
        0px 10px 20px -5px black,
        0 2px 15px -5px black,
        0 0 20px 0px transparent;
`;
interface Props {
    post: MdxData;
    isSeries: boolean;
    disabled: boolean;
}

const mouseMoveHandler = (event: React.MouseEvent<HTMLDivElement, MouseEvent>, aRef: React.RefObject<HTMLAnchorElement>, underlayRef: React.RefObject<HTMLDivElement>) => {
    const x = event.nativeEvent.offsetX;
    const y = event.nativeEvent.offsetY;
    const rotateX = (4 / 30) * y - 20;
    const rotateY = (-1 / 5) * x + 20;
    (aRef.current as any).style = `transform: perspective(350px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    (event.target as any).style = `transform: perspective(350px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    (underlayRef.current as any).style = `transform: perspective(350px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
};

const mouseLeaveHandler = (event: React.MouseEvent<HTMLDivElement, MouseEvent>, aRef: React.RefObject<HTMLAnchorElement>, underlayRef: React.RefObject<HTMLDivElement>) => {
    (aRef.current as any).style = "transform: perspective(350px) rotateX(0deg) rotateY(0deg)";
    (event.target as any).style = "transform: perspective(350px) rotateX(0deg) rotateY(0deg)";
    (underlayRef.current as any).style = "transform: perspective(350px) rotateX(0deg) rotateY(0deg)";
};

const Card: React.FC<Props> = (props) => {
    const { post, isSeries, disabled } = props;
    const aRef = useRef<HTMLAnchorElement>(null);
    const underlayRef = useRef<HTMLDivElement>(null);
    return (
        <Container>
            <CardOverlay
                onMouseMove={(event) => {
                    mouseMoveHandler(event, aRef, underlayRef);
                }}
                onMouseLeave={(event) => {
                    mouseLeaveHandler(event, aRef, underlayRef);
                }}
                onClick={() => {
                    if (disabled) {
                        return;
                    }
                    if (!aRef.current) {
                        return;
                    }
                    aRef.current.click();
                }}
            />
            <CardLink href={post.href} ref={aRef}>
                <Title>{isSeries ? post.data.seriesTitle : post.data.title}</Title>
                <Category>{post.data.category}</Category>
                <CreatedAt>{dayjs(post.data.createdAt).format("YYYY-MM-DD")}</CreatedAt>
            </CardLink>
            <CardUnderlay ref={underlayRef} />
        </Container>
    );
};

export default Card;
