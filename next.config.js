/** @type {import('next').NextConfig} */
require("dotenv").config();
const nextConfig = {
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
    }
};

module.exports = nextConfig
