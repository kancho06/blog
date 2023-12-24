import getConfig from "../config";

// next.js default src path = "/public"
export function resolvePath(src: string) {
    const config = getConfig();
    return config.basePath + src;
}
