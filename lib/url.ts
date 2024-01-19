import getConfig from "../config";

export function resolvePath(src: string) {
    const config = getConfig();
    console.info("config.basePath + src; => ", config.basePath + src);
    return config.basePath + src;
}
