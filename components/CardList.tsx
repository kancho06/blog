import React from "react";
import styled from "styled-components";
import Card from "./Card";
import { MdxData } from "../lib/mdx";
import colors from "../lib/color";

const Container = styled.div`
    padding: 20px;
    width: 100%;
`;

const Label = styled.div`
    font-size: 25px;
    color: ${colors.black};
    font-weight: bold;
    margin-left: 20px;
`;

const ListArea = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    flex-wrap: wrap;
    margin: 15px 0 0 0px;
    gap: 30px;
`;

interface Props {
    label: string;
    posts: MdxData[];
    isSeries?: boolean;
    disabled?: boolean;
}

const CardList: React.FC<Props> = (props) => {
    const { label, posts, isSeries = false, disabled = false } = props;
    return (
        <Container>
            <Label>{label}</Label>
            <ListArea>
                {posts.map((post, i) => {
                    return <Card key={i} post={post} isSeries={isSeries} disabled={disabled} />;
                })}
            </ListArea>
        </Container>
    );
};

export default CardList;
