import React from "react";
import { WithRouterProps } from "next/dist/client/with-router";
import getConfig from "../config";
import styled from "styled-components";
import colors from "../lib/color";
import Menu, { MenuItem } from "../components/Menu";
const config = getConfig();

const Container = styled.div`
    width: 100%;
    height: 100%;
`;

const EnvLabel = styled.div`
    position: fixed;
    top: 0;
    right: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 30px;
    width: 200px;
    z-index: 10000;
    color: white;
    background-color: ${colors.red};
`;

interface Props extends WithRouterProps {
    children: any;
}

const menuItems: MenuItem[] = [
    { label: "Kancho's blog", href: "/blog/" },
    { label: "Profile", href: "/blog/profile" },
    { label: "Tech", href: "/blog/tech" },
    { label: "Daily", href: "/blog/daily" },
    { label: "Contact", href: "/blog/contact" },
];

const MainLayout: React.FC<Props> = (props) => {
    const { children, router } = props;
    const isProd = config.environment === "production";
    return (
        <Container>
            {!isProd && <EnvLabel>ENV: {config.environment}</EnvLabel>}
            <Menu menuItems={menuItems} router={router} />
            {children}
        </Container>
    );
};

export default MainLayout;