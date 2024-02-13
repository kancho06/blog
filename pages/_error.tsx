import { NextPage, NextPageContext } from "next";
import styled from "styled-components";

const Container = styled.div`
    width: 100%;
    margin-top: 80px;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const CustomH1 = styled.h1``;

interface Props {
    statusCode?: number;
}

const Error: NextPage<Props> = (props) => {
    const { statusCode } = props;
    return (
        <Container>
            <CustomH1>{statusCode ? `${statusCode}-Server Error` : "Client Error"}</CustomH1>
        </Container>
    );
};

Error.getInitialProps = ({ res, err }: NextPageContext) => {
    const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
    return { statusCode: statusCode };
};

export default Error;
