import { PageComponent } from "../../../types/page";
import styled from "styled-components";
import MdxViewer from "../../../components/mdxViewer/MdxViewer";
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from "next";
import MainLayout from "../../../layout/MainLayout";
import * as api from "../../../lib/api";
import { MDXRemote } from "next-mdx-remote";

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
                    <MdxViewer>
                        <MDXRemote {...data.mdxSrc} />
                    </MdxViewer>
                </MdxWrapper>
            </Container>
        </MainLayout>
    );
};

export const getStaticPaths: GetStaticPaths = async () => {
    const techFilePaths = api.getPaths(api.TECH_FILE_PATH);
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
    const path = api.TECH_DETAIL_FILE_PATH(context.params.id as string);
    const post = await api.getDetailMdxData(path);
    return {
        props: {
            data: post,
        },
    };
};

export default Detail;
