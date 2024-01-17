/** @type {import('next').NextConfig} */
require("dotenv").config();
const withMDX = require('@next/mdx')({
    extension: /\.mdx?$/,
    options: {
        // If you use remark-gfm, you'll need to use next.config.mjs
        // as the package is ESM only
        // https://github.com/remarkjs/remark-gfm#install
        remarkPlugins: [],
        rehypePlugins: [],
        // If you use `MDXProvider`, uncomment the following line.
        // providerImportSource: "@mdx-js/react",
    }
});
const nextConfig = {
    basePath: "/blog",
    output: "export",
    webpack: config => {
        config.plugins = config.plugins || [];
        return config;
    },
    compiler: {
        styledComponents: true,
    },
    env: {
        environment: process.env.ENVIRONMENT,
        basePath: process.env.BASE_PATH,
    },
    // Configure pageExtensions to include md and mdx
    pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
    // Optionally, add any other Next.js config below
    reactStrictMode: true
};

module.exports = withMDX(nextConfig);
