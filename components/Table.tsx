import React from "react";
import { TechData } from "../lib/api";
import styled from "styled-components";
import colors from "../lib/color";
import Link from "next/link";
import * as storage from "../lib/storage";

const Container = styled.div`
    width: 100%;
`;

const Title = styled.div`
    font-size: 35px;
    font-weight: bold;
    color: ${colors.black};
`;

const CustomUl = styled.ul`
    padding: 10px;
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

const PostTitle = styled.a`
    font-size: 20px;
    color: ${colors.black};
    font-weight: bold;
    line-height: 26px;
    :hover {
        font-size: 23px;
        color: ${colors.red};
    }
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
    title: string;
    data: TechData[];
}

const handleClick = (id: string) => {
    const techHistory = storage.getTechHistory();
    storage.setTechHistory([...new Set([id, ...techHistory])]);
};

const Table: React.FC<Props> = (props) => {
    const { title, data } = props;

    return (
        <Container>
            <Title>{title}</Title>
            <CustomUl>
                {data.map((d, i) => {
                    return (
                        <>
                            <CustomLi key={i}>
                                <Link href={`/blog/tech/${d.data.id}/detail`} passHref legacyBehavior>
                                    <PostTitle
                                        onClick={() => {
                                            handleClick(d.data.id + "");
                                        }}
                                    >
                                        {d.data.title}
                                    </PostTitle>
                                </Link>
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
