import { PageComponent } from "../../../../types/page";
import { GetStaticPaths, GetStaticProps } from "next";
import * as api from "../../../../lib/api";
import * as mdx from "../../../../lib/mdx";
import styled from "styled-components";
import MainLayout from "../../../../layout/MainLayout";
import CardList from "../../../../components/CardList";
import Table from "../../../../components/Table";
import Pager from "../../../../components/Pager";
import { useState } from "react";
import colors from "../../../../lib/color";
import { Seo } from "../../../../types/seo";

const Container = styled.div`
    width: 100%;
    margin-top: 80px;
    padding-left: 20px;
    display: flex;
    gap: 120px;
`;

const TableWrapper = styled.div`
    width: 50%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 50px;
`;

const CardWrapper = styled.div`
    padding: 50px 0 0 120px;
`;

const DescriptionWrapper = styled.div`
    width: 100%;
    padding: 15px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    border: 2px solid ${colors.black};
    border-radius: 8px;
    margin-bottom: 30px;
    gap: 10px;
`;

const Description = styled.div`
    font-size: 20px;
    color: ${colors.black};
    font-weight: 500;
`;

const CreatedAt = styled.div`
    font-size: 16px;
    color: ${colors.grey};
`;

const PAGE_UNIT = 10;

type PageParam = {
    unit: number;
    offset: number;
};

const Index: PageComponent<{ posts: mdx.MdxData[] }> = (props) => {
    const { router, data } = props;
    const [pageParam, setPageParam] = useState<PageParam>({
        unit: PAGE_UNIT,
        offset: 0,
    });
    const totalCount = data.posts.length;
    const slicedData = data.posts.slice(pageParam.offset, pageParam.offset + PAGE_UNIT);
    return (
        <MainLayout router={router}>
            <Container>
                <CardWrapper>
                    <CardList label="" posts={[data.posts[0]]} disabled isSeries />
                </CardWrapper>
                <TableWrapper>
                    <DescriptionWrapper>
                        <Description>{data.posts[0].data.description}</Description>
                        <CreatedAt>
                            {data.posts[0].data.createdAt}&nbsp;({totalCount}&nbsp;Posts)
                        </CreatedAt>
                    </DescriptionWrapper>
                    <Table label={data.posts[0].data.seriesTitle ?? ""} data={slicedData} onClick={() => {}} />
                    <Pager
                        totalCount={totalCount}
                        param={pageParam}
                        onChange={(param) => {
                            setPageParam({
                                ...pageParam,
                                ...param,
                            });
                        }}
                    />
                </TableWrapper>
            </Container>
        </MainLayout>
    );
};

export const getStaticPaths: GetStaticPaths = async () => {
    const paths = api.getStaticAllSeriesMdxPaths();
    return {
        paths,
        fallback: false,
    };
};

export const getStaticProps: GetStaticProps = async (context) => {
    if (!context.params || !context.params.id || !context.params.type) {
        return {
            props: {
                data: {
                    seo: null,
                    posts: null,
                },
            },
        };
    }
    const posts = api.getDetailSeriesMdxData(context.params.type as mdx.DataType, context.params.id as string);
    const seo: Seo = {
        title: posts[0].data.seriesTitle || posts[0].data.title,
        description: posts[0].data.description,
        url: `https://kancho06.github.io/blog/series/${posts[0].data.seriesId}/${posts[0].data.type}`,
        imgPath: "",
    };
    return {
        props: {
            data: {
                seo,
                posts,
            },
        },
    };
};

export default Index;
