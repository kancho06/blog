import React from "react";
import { PageComponent } from "../types/page";
import styled from "styled-components";
import * as url from "../lib/url";
import MainLayout from "../layout/MainLayout";

const Container = styled.div`
    width: 100%;
    height: 100%;
`;

const StyledImg = styled.img`
    width: 200px;
    height: 200px;
`;

const Index: PageComponent = (props) => {
    const { router } = props;
    return (
        <MainLayout router={router}>
            <h1>hello world</h1>
            <StyledImg src={url.resolvePath("/next.svg")} />
        </MainLayout>
    );
};

export default Index;
