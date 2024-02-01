import { PageComponent } from "../../../types/page";
import styled from "styled-components";
import MdxViewer from "../../../components/mdxViewer/MdxViewer";
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from "next";
import MainLayout from "../../../layout/MainLayout";
import * as api from "../../../lib/api";
import * as mdx from "../../../lib/mdx";
import { useEffect, useRef, useState } from "react";
import TableOfContent from "../../../components/mdxViewer/TableOfContent";
import colors from "../../../lib/color";
import dayjs from "dayjs";

const Container = styled.div`
    width: 100%;
    margin: 80px 0 0 0;
    padding: 0 20px;
`;

const InfoWrapper = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 20px;
    padding-top: 50px;
`;

const Title = styled.div`
    font-size: 40px;
    font-weight: bold;
    color: ${colors.black};
`;

const DetailInfoWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
`;

const Info = styled.div`
    font-size: 20px;
    color: ${colors.grey};
`;

const Line = styled.div`
    width: 95%;
    border-bottom: 2px solid ${colors.black};
    margin-top: 50px;
`;

const MdxWrapper = styled.div<{
    tocWidth: number;
}>`
    width: ${(props) => (props.tocWidth > 0 ? `calc(100% - ${props.tocWidth + 80}px)` : "80%")};
    padding-top: 30px;
    padding-bottom: 300px;
`;

const TOCWrapper = styled.div`
    display: flex;
    position: fixed;
    right: 30px;
    top: 330px;
`;

const Detail: PageComponent<mdx.DetailMdxData> = (props) => {
    const { router, data } = props;
    const [tocWidth, setTocWidth] = useState<number>(0);
    const tocWrapperRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        if (tocWrapperRef.current) {
            setTocWidth(tocWrapperRef.current.offsetWidth);
        }
    }, [tocWrapperRef.current]);
    return (
        <MainLayout router={router}>
            <Container>
                <TOCWrapper ref={tocWrapperRef}>
                    <TableOfContent content={data.content} />
                </TOCWrapper>
                <InfoWrapper>
                    <Title>{data.data.title}</Title>
                    <DetailInfoWrapper>
                        <Info>{dayjs(data.data.createdAt).format("YYYY.MM.DD HH:mm")}</Info>
                    </DetailInfoWrapper>
                    <Line />
                </InfoWrapper>
                <MdxWrapper tocWidth={tocWidth}>
                    <MdxViewer>{data.mdxSrc}</MdxViewer>
                </MdxWrapper>
            </Container>
        </MainLayout>
    );
};

export const getStaticPaths: GetStaticPaths = async () => {
    const paths = api.getStaticAllMdxPaths("tech");
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
    const post = await api.getDetailMdxData("tech", context.params.id as string);
    return {
        props: {
            data: post,
        },
    };
};

export default Detail;
