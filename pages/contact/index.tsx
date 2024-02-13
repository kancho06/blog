import { PageComponent } from "../../types/page";
import styled from "styled-components";
import MainLayout from "../../layout/MainLayout";
import { GetStaticProps } from "next";
import { Seo } from "../../types/seo";

const Container = styled.div`
    width: 100%;
    margin: 80px 0 0 20px;
`;

const Index: PageComponent<null> = (props) => {
    const { router } = props;
    return (
        <MainLayout router={router}>
            <Container></Container>
        </MainLayout>
    );
};

export const getStaticProps: GetStaticProps = async () => {
    const seo: Seo = {
        title: "Contact",
        description: "",
        url: "https://kancho06.github.io/blog/contact",
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

export default Index;
