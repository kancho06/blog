import React from "react";
import { PageComponent } from "../types/page";
import styled from "styled-components";
import * as url from "../lib/url";
import MainLayout from "../layout/MainLayout";
import CardList from "../components/CardList";
import { GetStaticProps } from "next";
import * as api from "../lib/api";
import { MdxData } from "../lib/mdx";
import { Seo } from "../types/seo";

const Container = styled.div`
    width: 100%;
    margin-top: 80px;
    padding-left: 10px;
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
    const recentTechData = tech.slice(0, 6);
    const recentAlgorithmData = algorithm.slice(0, 6);
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
    const seo: Seo = {
        title: "kancho's blog",
        description: "welcome to kancho's blog",
        url: "https://kancho06.github.io/blog",
        imgPath: "",
    };
    const tech = api.getAllMdxData("tech");
    const algorithm = api.getAllMdxData("algorithm");
    return {
        props: {
            data: {
                seo,
                tech,
                algorithm,
            },
        },
    };
};

export default Index;
