import React from "react";
import { NextSeo } from "next-seo";
import NextHead from "next/head";

const Head = (): JSX.Element => {
    const title = "Kancho's-Blog";
    return (
        <NextHead>
            <title key="title">{title}</title>
            <meta charSet="utf-8" />
            <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no" />
            <NextSeo
                title={title}
                description="Kancho's Blog"
                canonical="https://kancho06.gihub.io/kancho-til"
                openGraph={{
                    url: "https://kancho06.gihub.io/kancho-til",
                    title: title,
                    description: "Kancho's Blog",
                    images: [
                        {
                            url: "",
                            width: 800,
                            height: 600,
                            alt: "",
                        },
                    ],
                    siteName: title,
                }}
                twitter={{
                    handle: "@",
                    site: "@",
                    cardType: "",
                }}
            />
        </NextHead>
    );
};

export default Head;
