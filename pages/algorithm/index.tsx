import styled from "styled-components";
import colors from "../../lib/color";
import { PageComponent } from "../../types/page";
import * as api from "../../lib/api";
import { GetStaticProps } from "next";
import { useState } from "react";
import useDebounce from "../../lib/useDebounce";
import * as storage from "../../lib/storage";
import MainLayout from "../../layout/MainLayout";
import SearchInput from "../../components/SearchInput";
import Table from "../../components/Table";
import Pager from "../../components/Pager";
import HistoryTable from "../../components/HistoryTable";

const Container = styled.div`
    width: 100%;
    margin: 80px 0 0 20px;
`;

const ResultArea = styled.div`
    width: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
`;

const TableWrapper = styled.div`
    width: 68%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
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
    const techHistory = storage.getAlgorithmHistory();
    storage.setAlgorithmHistory([...new Set([id, ...techHistory])]);
};

const Index: PageComponent<api.MdxData[]> = (props) => {
    const { router, data } = props;
    const [pageParam, setPageParam] = useState<PageParam>({
        unit: PAGE_UNIT,
        offset: 0,
        searchParam: {
            keyword: "",
        },
    });
    const debouncedSearchParam = useDebounce(pageParam.searchParam.keyword, 200);
    const targetData = (() => {
        if (!pageParam.searchParam.keyword.length) {
            return data;
        }
        return data.filter((d) => {
            const titleLowerCase = d.data.title.toLowerCase();
            const seriesLowerCase = d.data.seriesTitle ? d.data.seriesTitle.toLowerCase() : "";
            const keywordLowerCase = pageParam.searchParam.keyword.toLowerCase();
            return titleLowerCase.includes(keywordLowerCase) || seriesLowerCase.includes(keywordLowerCase);
        });
    })();
    const totalCount = targetData.length;
    const slicedData = targetData.slice(pageParam.offset, pageParam.offset + PAGE_UNIT);
    const historyIds = storage.getAlgorithmHistory().slice(0, 10);
    const history = data.filter((d) => {
        return historyIds.includes(d.data.id + "");
    });
    const sortedHistory: api.MdxData[] = [];
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
                    <Label>Algorithm board</Label>
                    <Description>アルゴリズム解いながら学んだことを書きます。</Description>
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
                </ResultArea>
            </Container>
        </MainLayout>
    );
};

export const getStaticProps: GetStaticProps = async () => {
    const posts = api.getAllMdxData("algorithm");
    return {
        props: {
            data: posts,
        },
    };
};

export default Index;
