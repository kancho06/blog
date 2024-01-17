import React from "react";
import styled from "styled-components";

const Container = styled.div``;

interface Props {
    children: React.ReactNode;
}

const MdxLayout: React.FC<Props> = (props) => {
    const { children } = props;
    return <Container>{children}</Container>;
};

export default MdxLayout;
