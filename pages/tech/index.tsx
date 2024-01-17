import { PageComponent } from "../../types/page";
import styled from "styled-components";
import { GetStaticProps } from "next";
import MainLayout from "../../layout/MainLayout";
import Table from "../../components/Table";
import Pager from "../../components/Pager";
import { useState } from "react";
import * as api from "../../lib/api";
import * as storage from "../../lib/storage";
import HistoryTable from "../../components/HistoryTable";

const Container = styled.div`
    width: 100%;
    margin: 80px 0 0 20px;
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

const PAGE_UNIT = 10;

const Index: PageComponent<api.TechData[]> = (props) => {
    const { router, data } = props;
    const [pageParam, setPageParam] = useState<{
        unit: number;
        offset: number;
    }>({
        unit: PAGE_UNIT,
        offset: 0,
    });
    const totalCount = data.length;
    const targetData = data.slice(pageParam.offset, pageParam.offset + PAGE_UNIT);
    const historyIds = storage.getTechHistory().slice(0, 10);
    const history = data.filter((d) => {
        return historyIds.includes(d.data.id + "");
    });
    const sortedHistory: api.TechData[] = [];
    historyIds.forEach((_, i) => {
        history.forEach((d) => {
            if (historyIds[i] === d.data.id + "") {
                sortedHistory.push(d);
            }
        });
    });
    return (
        <MainLayout router={router}>
            <Container>
                <TableWrapper>
                    <Table title="Retlated Posts" data={targetData} />
                    <Pager
                        totalCount={totalCount}
                        param={pageParam}
                        onChange={(param) => {
                            setPageParam(param);
                        }}
                    />
                </TableWrapper>
                <HistoryTableWrapper>
                    <HistoryTable history={sortedHistory} />
                </HistoryTableWrapper>
            </Container>
        </MainLayout>
    );
};

export const getStaticProps: GetStaticProps = async () => {
    const posts = api.getAllTechData();
    return {
        props: {
            data: posts,
        },
    };
};

export default Index;
