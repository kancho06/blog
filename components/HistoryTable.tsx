import React from "react";
import styled from "styled-components";
import * as api from "../lib/api";
import colors from "../lib/color";
import Link from "next/link";

const Container = styled.div`
    width: 100%;
`;

const Label = styled.div`
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
    onClick: (id: string) => void;
}

const HistoryTable: React.FC<Props> = (props) => {
    const { history, onClick } = props;
    return (
        <Container>
            <Label>History</Label>
            <CustomUl>
                {history.map((data, i) => {
                    return (
                        <>
                            <CustomLi key={"history-" + i}>
                                <Link href={data.href} passHref legacyBehavior>
                                    <PostTitle
                                        onClick={() => {
                                            onClick(data.data.id + "");
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
