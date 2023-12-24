import React from "react";
import { createGlobalStyle } from "styled-components";
import colors from "../lib/color";
import breakPoint from "../lib/breakPoint";
import App, { AppProps } from "next/app";
import Head from "../components/Head";
import { Router } from "next/router";

const GlobalStyle = createGlobalStyle`
    * {
        box-sizing: border-box;
    }
    html{
        font-size: 62.5%;
    }
    body{
        font-size:1.6rem;
        font-family: “Century Gothic”, CenturyGothic, -apple-system, BlinkMacSystemFont, “Helvetica Neue”, YuGothic, “ヒラギノ角ゴ ProN W3”, Hiragino Kaku Gothic ProN, Arial, “メイリオ”, Meiryo, sans-serif;
        color: ${colors.black};
    }
    @media screen and (max-width: ${breakPoint.mobile}px) {
        body{
            font-size:1.6rem;
        }
    }
    a, a:hover, a:focus, a:active {
        text-decoration: none;
        color: inherit;
    }
    * {
        box-sizing: border-box;
    }
    input,select{
        border: 0;
    }
    img{
        max-width: 100%;
        height: auto;
    }
    input[type="button"],input[type="text"],input[type="number"],input[type="submit"],input[type="image"],input[type="password"],textarea,select {
        font-size: 1.6rem;
        -webkit-appearance: none;
        border-radius: 0;
    }
    *:focus {
        outline: none;
    }
    a {
        color: ${colors.blue};
    }
`;

class MyApp extends App<{ appProps: AppProps }> {
    componentDidMount() {
        Router.events.on("routeChangeComplete", () => {
            window.scrollTo(0, 0);
        });
    }

    render() {
        const { Component, pageProps, router } = this.props;
        return (
            <>
                <Head />
                <GlobalStyle />
                <Component {...pageProps} router={router} />
            </>
        );
    }
}

export default MyApp;
