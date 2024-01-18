import React from "react";
import * as api from "../lib/api";
import styled from "styled-components";
import colors from "../lib/color";
import Link from "next/link";
import * as storage from "../lib/storage";

const Container = styled.div`
    width: 100%;
`;

const Label = styled.div`
    font-size: 25px;
    font-weight: bold;
    color: ${colors.black};
`;

const CustomUl = styled.ul`
    padding: 10px;
    margin-top: 0;
`;

const CustomLi = styled.li`
    list-style-type: none;
    margin-top: 10px;
`;

const Line = styled.div`
    width: 100%;
    border-bottom: 2px solid ${colors.grey};
    margin-top: 10px;
`;

const TitleArea = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: flex-end;
`;

const Title = styled.a`
    font-size: 20px;
    color: ${colors.black};
    font-weight: bold;
    line-height: 26px;
    :hover {
        font-size: 23px;
        color: ${colors.red};
    }
`;

const Category = styled.div`
    font-size: 16px;
    color: ${colors.slateGrey};
    margin-left: 20px;
`;

const AuthorArea = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin-top: 5px;
`;

const Author = styled.div`
    font-size: 13px;
    color: ${colors.grey};
`;

const CreatedAt = styled.div`
    font-size: 13px;
    color: ${colors.grey};
`;

const DescriptionArea = styled.div`
    font-size: 16px;
    color: ${colors.grey};
    margin-top: 10px;
`;

interface Props {
    label: string;
    data: api.MdxData[];
}

const handleClick = (id: string) => {
    const techHistory = storage.getTechHistory();
    storage.setTechHistory([...new Set([id, ...techHistory])]);
};

const Table: React.FC<Props> = (props) => {
    const { label, data } = props;

    return (
        <Container>
            <Label>{label}</Label>
            <CustomUl>
                {data.map((d, i) => {
                    return (
                        <>
                            <CustomLi key={i}>
                                <TitleArea>
                                    <Link href={`/tech/${d.data.id}/detail`} passHref legacyBehavior>
                                        <Title
                                            onClick={() => {
                                                handleClick(d.data.id + "");
                                            }}
                                        >
                                            {d.data.title}
                                        </Title>
                                    </Link>
                                    <Category>{d.data.category}</Category>
                                </TitleArea>
                                <AuthorArea>
                                    <Author>{d.data.author}&nbsp;//&nbsp;</Author>
                                    <CreatedAt>{d.data.createdAt}</CreatedAt>
                                </AuthorArea>
                                <DescriptionArea>{d.data.description}</DescriptionArea>
                                <Line />
                            </CustomLi>
                        </>
                    );
                })}
            </CustomUl>
        </Container>
    );
};

export default Table;
