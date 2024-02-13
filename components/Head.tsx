import React from "react";
import { NextSeo } from "next-seo";
import NextHead from "next/head";
import { Seo } from "../types/seo";

interface Props {
    data: any;
}

const defaultSeo: Seo = {
    title: "kancho's blog",
    description: "welcome kancho's blog",
    url: "https://kancho06.gihub.io/blog",
    imgPath: "",
};

const Head: React.FC<Props> = (props): JSX.Element => {
    const seo: Seo = props.data.data.seo || defaultSeo;
    return (
        <NextHead>
            <title key="title">{seo.title}</title>
            <meta charSet="utf-8" />
            <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no" />
            <NextSeo
                title={seo.title}
                description={seo.description}
                canonical="https://kancho06.gihub.io/blog"
                openGraph={{
                    url: seo.url,
                    title: seo.title,
                    description: seo.description,
                    images: [
                        {
                            url: "",
                            width: 800,
                            height: 600,
                            alt: "",
                        },
                    ],
                    siteName: "kancho's blog",
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
