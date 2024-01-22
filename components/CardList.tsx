import React from "react";
import styled from "styled-components";
import Card from "./Card";
import { MdxData } from "../lib/api";
import colors from "../lib/color";

const Container = styled.div`
    padding: 10px;
`;

const Label = styled.div`
    font-size: 20px;
    color: ${colors.black};
    font-weight: bold;
`;

const ListArea = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 15px;
    gap: 10px;
`;

interface Props {
    label: string;
    posts: MdxData[];
}

const CardList: React.FC<Props> = (props) => {
    const { label, posts } = props;
    const recentPosts = posts.slice(0, 5);
    return (
        <Container>
            <Label>{label}</Label>
            <ListArea>
                {recentPosts.map((post, i) => {
                    return <Card key={i} post={post} />;
                })}
            </ListArea>
        </Container>
    );
};

export default CardList;
