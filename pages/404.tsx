import styled from "styled-components";
import { GetStaticProps } from "next";
import MainLayout from "../layout/MainLayout";
import { PageComponent } from "../types/page";

const Container = styled.div`
    width: 100%;
    margin-top: 80px;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const CustomH1 = styled.h1``;

const Custom404: PageComponent<null> = (props) => {
    const { router } = props;
    return (
        <MainLayout router={router}>
            <Container>
                <CustomH1>Page Not Found</CustomH1>
            </Container>
        </MainLayout>
    );
};

export const getStaticProps: GetStaticProps = async () => {
    return {
        props: {
            data: {},
        },
    };
};

export default Custom404;
