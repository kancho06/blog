import { PageComponent } from "../../types/page";
import styled from "styled-components";
import { GetStaticProps } from "next";
import MainLayout from "../../layout/MainLayout";
import Table from "../../components/Table";
import Pager from "../../components/Pager";
import { useState } from "react";
import * as mdx from "../../lib/mdx";
import * as api from "../../lib/api";
import * as storage from "../../lib/storage";
import HistoryTable from "../../components/HistoryTable";
import SearchInput from "../../components/SearchInput";
import useDebounce from "../../lib/useDebounce";
import colors from "../../lib/color";
import CardList from "../../components/CardList";
import { Seo } from "../../types/seo";

const Container = styled.div`
    width: 100%;
    margin-top: 80px;
    padding-left: 20px;
`;

const ResultArea = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    gap: 10px;
`;

const TableWrapper = styled.div`
    width: 68%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const Row = styled.div<{
    isFlex?: boolean;
}>`
    width: 100%;
    display: ${(props) => (props.isFlex ? "flex" : "unset")};
`;

const CardListLabel = styled.div`
    font-size: 25px;
    font-weight: bold;
    color: ${colors.black};
`;

const HistoryTableWrapper = styled.div`
    padding-top: 80px;
    margin-left: 20px;
`;

const SearchArea = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    margin-bottom: 20px;
`;

const SearchInputWrapper = styled.div`
    width: 50%;
    height: 40px;
`;

const PageDescriptionArea = styled.div`
    display: flex;
    flex-direction: column;
    margin-bottom: 10px;
`;

const Label = styled.div`
    font-size: 35px;
    color: ${colors.black};
    font-weight: bold;
    padding: 10px 0;
`;

const Description = styled.div`
    font-size: 16px;
    color: ${colors.black};
    margin-left: 10px;
`;

const PAGE_UNIT = 10;

type SearchParam = {
    keyword: string;
};

type PageParam = {
    unit: number;
    offset: number;
    searchParam: SearchParam;
};

const handleClick = (id: string) => {
    const techHistory = storage.getTechHistory();
    storage.setTechHistory([...new Set([id, ...techHistory])]);
};

const Index: PageComponent<{ posts: mdx.MdxData[]; series: mdx.MdxData[]; pageTitle: string }> = (props) => {
    const { router, data } = props;
    const [pageParam, setPageParam] = useState<PageParam>({
        unit: PAGE_UNIT,
        offset: 0,
        searchParam: {
            keyword: "",
        },
    });
    const debouncedSearchParam = useDebounce(pageParam.searchParam.keyword, 200);
    const targetPosts = (() => {
        if (!pageParam.searchParam.keyword.length) {
            return data.posts;
        }
        return data.posts.filter((d) => {
            const titleLowerCase = d.data.title.toLowerCase();
            const keywordLowerCase = pageParam.searchParam.keyword.toLowerCase();
            return titleLowerCase.includes(keywordLowerCase);
        });
    })();
    const targetSeries = (() => {
        if (!pageParam.searchParam.keyword.length) {
            return data.series;
        }
        return data.series.filter((s) => {
            const titleLowerCase = s.data.seriesTitle ? s.data.seriesTitle.toLowerCase() : "";
            const keywordLowerCase = pageParam.searchParam.keyword.toLowerCase();
            return titleLowerCase.includes(keywordLowerCase);
        });
    })();
    const totalCount = targetPosts.length;
    const slicedData = targetPosts.slice(pageParam.offset, pageParam.offset + PAGE_UNIT);
    const historyIds = storage.getTechHistory().slice(0, 10);
    const history = data.posts.filter((d) => {
        return historyIds.includes(d.data.id + "");
    });
    const sortedHistory: mdx.MdxData[] = [];
    historyIds.forEach((_, i) => {
        history.forEach((d) => {
            if (historyIds[i] === d.data.id + "") {
                sortedHistory.push(d);
            }
        });
    });
    const tableLabel = debouncedSearchParam ? `Results of "${debouncedSearchParam}"` : "Related Posts";
    return (
        <MainLayout router={router}>
            <Container>
                <PageDescriptionArea>
                    <Label>Tech board</Label>
                    <Description>開発しながら扱った技術の情報や学んだことを書きます。</Description>
                </PageDescriptionArea>
                <SearchArea>
                    <SearchInputWrapper>
                        <SearchInput
                            placeHolder="Search Post Title or Series Name"
                            onChange={(value) => {
                                setPageParam({
                                    unit: PAGE_UNIT,
                                    offset: 0,
                                    searchParam: {
                                        keyword: value,
                                    },
                                });
                            }}
                        />
                    </SearchInputWrapper>
                </SearchArea>
                <ResultArea>
                    <Row>
                        <CardListLabel>Series</CardListLabel>
                        <CardList label="" posts={targetSeries} isSeries />
                    </Row>
                    <Row isFlex={true}>
                        <TableWrapper>
                            <Table
                                label={tableLabel}
                                data={slicedData}
                                onClick={(id) => {
                                    handleClick(id);
                                }}
                            />
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
                        <HistoryTableWrapper>
                            <HistoryTable
                                history={sortedHistory.slice(0, 7)}
                                onClick={(id) => {
                                    handleClick(id);
                                }}
                            />
                        </HistoryTableWrapper>
                    </Row>
                </ResultArea>
            </Container>
        </MainLayout>
    );
};

export const getStaticProps: GetStaticProps = async () => {
    const seo: Seo = {
        title: "Tech Board",
        description: "開発しながら扱った技術の情報や学んだことを書きます。",
        url: "https://kancho06.github.io/blog/tech",
        imgPath: "",
    };
    const posts = api.getAllMdxData("tech");
    const series = api.getAllSeriesMdxData("tech");
    return {
        props: {
            data: {
                seo,
                posts,
                series,
            },
        },
    };
};

export default Index;
