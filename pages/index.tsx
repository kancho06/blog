import React from "react";
import { PageComponent } from "../types/page";
import styled from "styled-components";
import * as url from "../lib/url";
import MainLayout from "../layout/MainLayout";

const Container = styled.div`
    width: 100%;
    margin: 80px 0 0 20px;
`;

const StyledImg = styled.img`
    width: 200px;
    height: 200px;
`;

const Index: PageComponent<null> = (props) => {
    const { router } = props;
    return (
        <MainLayout router={router}>
            <Container>
                <StyledImg src={url.resolvePath("/next.svg")} />
            </Container>
        </MainLayout>
    );
};

export default Index;
