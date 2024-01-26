import React from "react";
import { PageComponent } from "../types/page";
import styled from "styled-components";
import * as url from "../lib/url";
import MainLayout from "../layout/MainLayout";
import CardList from "../components/CardList";
import { GetStaticProps } from "next";
import * as api from "../lib/api";
import { MdxData } from "../lib/api";

const Container = styled.div`
    width: 100%;
    margin: 80px 0 0 20px;
`;

const CardListArea = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
`;

const AreaTitle = styled.div`\
    font-size: 30px;
    font-weight: bold;
    margin-left: 10px;
`;

const StyledImg = styled.img`
    width: 200px;
    height: 200px;
`;

const Index: PageComponent<{ tech: MdxData[]; algorithm: MdxData[] }> = (props) => {
    const { router, data } = props;
    const { tech, algorithm } = data;
    const recentTechData = tech.slice(0, 5);
    const recentAlgorithmData = algorithm.slice(0, 5);
    return (
        <MainLayout router={router}>
            <Container>
                <StyledImg src={url.resolvePath("/next.svg")} />
                <CardListArea>
                    <AreaTitle>Recent Posts</AreaTitle>
                    <CardList key="tech" label="Tech" posts={recentTechData} />
                    <CardList key="algorithm" label="Algorithm" posts={recentAlgorithmData} />
                </CardListArea>
            </Container>
        </MainLayout>
    );
};

export const getStaticProps: GetStaticProps = async () => {
    const techData = api.getAllMdxData("tech");
    const algorithmData = api.getAllMdxData("algorithm");
    return {
        props: {
            data: {
                tech: techData,
                algorithm: algorithmData,
            },
        },
    };
};

export default Index;
