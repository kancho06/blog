export interface Config {
    basePath: string;
}

function assert(obj: any, key: any): string {
    if (obj[key] === null || obj[key] === undefined) {
        if (process && !process.browser && process.env && process.env.NEXT_PHASE === "phase-production-build") {
            // next.js run app code in build phase. It makes assert error here.
            // So, we check the phase and ignore the error.
            return "";
        }
        throw new Error("missing value: " + key);
    }
    return obj[key];
}

export function getConfig(): Config {
    const env = process.env;
    return {
        basePath: assert(env, "BASE_PATH"),
    };
}

export default getConfig;
