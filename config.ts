import * as process from "process";

export interface Config {
    environment: string;
    basePath: string;
}

export function getConfig(): Config {
    return {
        environment: process.env.environment || "",
        basePath: process.env.basePath || "",
    };
}

export default getConfig;
