import { PageComponent } from "../types/page";
import styled from "styled-components";
import MainLayout from "../layout/MainLayout";
import { GetStaticProps } from "next";
import { Seo } from "../types/seo";

const Container = styled.div`
    width: 100%;
    margin-top: 80px;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const CustomH1 = styled.h1``;

const Custom500: PageComponent<null> = (props) => {
    const { router } = props;
    return (
        <MainLayout router={router}>
            <Container>
                <CustomH1>Server Error</CustomH1>
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
    return {
        props: {
            data: {
                seo,
            },
        },
    };
};

export default Custom500;
