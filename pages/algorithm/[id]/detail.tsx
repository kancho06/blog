import styled from "styled-components";
import { PageComponent } from "../../../types/page";
import * as api from "../../../lib/api";
import MainLayout from "../../../layout/MainLayout";
import MdxViewer from "../../../components/mdxViewer/MdxViewer";
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from "next";

const Container = styled.div`
    width: 100%;
    margin: 80px 0 0 20px;
`;

const MdxWrapper = styled.div`
    width: 97%;
`;

const Detail: PageComponent<api.DetailMdxData> = (props) => {
    const { router, data } = props;
    return (
        <MainLayout router={router}>
            <Container>
                <MdxWrapper>
                    <MdxViewer>{data.mdxSrc}</MdxViewer>
                </MdxWrapper>
            </Container>
        </MainLayout>
    );
};

export const getStaticPaths: GetStaticPaths = async () => {
    const techFilePaths = api.getPaths(api.ALGORITHM_FILE_PATH);
    const paths = techFilePaths.map((path) => path.replace(/\.mdx?$/, "")).map((id) => ({ params: { id } }));
    return {
        paths,
        fallback: false,
    };
};

export const getStaticProps: GetStaticProps = async (context: GetStaticPropsContext) => {
    if (!context.params || !context.params.id) {
        return {
            props: {
                data: null,
            },
        };
    }
    const post = await api.getDetailMdxData("algorithm", context.params.id as string);
    return {
        props: {
            data: post,
        },
    };
};

export default Detail;
