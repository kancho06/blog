import styled from "styled-components";
import React from "react";
import Link from "next/link";
import colors from "../lib/color";
import { WithRouterProps } from "next/dist/client/with-router";

export interface MenuItem {
    label: string;
    href: string;
}

interface Props extends WithRouterProps {
    menuItems: MenuItem[];
}

const Container = styled.div`
    width: 100%;
    top: 0;
    left: 0;
    display: flex;
    position: fixed;
`;

const MenuArea = styled.div`
    width: 100%;
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #ffffff;
    border: 2px solid black;
    margin: 10px;
`;

const MenuItem = styled.div<{
    active: boolean;
}>`
    width: 100%;
    height: 100%;
    border-right: 2px solid black;
    font-weight: ${(props) => (props.active ? "bold" : "normal")};
    :last-child {
        border-right: none;
    }
`;

const BlackLink = styled.a`
    color: ${colors.black};
    font-size: 20px;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    :hover {
        font-size: 23px;
        color: ${colors.red};
    }
`;

const Menu: React.FC<Props> = (props) => {
    const { menuItems, router } = props;
    return (
        <Container>
            <MenuArea>
                {menuItems.map((item, i) => {
                    const active = item.href === router.pathname;
                    return (
                        <MenuItem key={i} active={active}>
                            <Link key={i} href={item.href} passHref legacyBehavior>
                                <BlackLink>{item.label}</BlackLink>
                            </Link>
                        </MenuItem>
                    );
                })}
            </MenuArea>
        </Container>
    );
};

export default Menu;
