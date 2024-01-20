import getConfig from "../config";

export function resolvePath(src: string) {
    const config = getConfig();
    return config.basePath + src;
}
