import React from "react";
import styled from "styled-components";
import * as api from "../lib/api";
import colors from "../lib/color";
import Link from "next/link";
import * as storage from "../lib/storage";

const Container = styled.div`
    width: 100%;
`;

const Title = styled.div`
    font-size: 16px;
    font-weight: bold;
    color: ${colors.black};
`;

const CustomUl = styled.ul``;

const CustomLi = styled.li`
    list-style-type: none;
    margin-top: 10px;
`;

const PostTitle = styled.a`
    font-size: 14px;
    color: ${colors.black};
    line-height: 16px;
    :hover {
        font-size: 16px;
        color: ${colors.red};
    }
`;

interface Props {
    history: api.MdxData[];
}

const handleClick = (id: string) => {
    const techHistory = storage.getTechHistory();
    storage.setTechHistory([...new Set([id, ...techHistory])]);
};

const HistoryTable: React.FC<Props> = (props) => {
    const { history } = props;

    return (
        <Container>
            <Title>History</Title>
            <CustomUl>
                {history.map((data) => {
                    return (
                        <>
                            <CustomLi>
                                <Link href={`/tech/${data.data.id}/detail`} passHref legacyBehavior>
                                    <PostTitle
                                        onClick={() => {
                                            handleClick(data.data.id + "");
                                        }}
                                    >
                                        {data.data.title}
                                    </PostTitle>
                                </Link>
                            </CustomLi>
                        </>
                    );
                })}
            </CustomUl>
        </Container>
    );
};

export default HistoryTable;
