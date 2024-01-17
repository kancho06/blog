const TECH_HISTORY_KEY = "tech_history";

const DAILY_HISTORY_KEY = "daily_history";

export function getTechHistory(): string[] {
    if (typeof window === "undefined") {
        return [];
    }
    const techHistory = localStorage.getItem(TECH_HISTORY_KEY);
    if (!techHistory) {
        return [];
    }
    try {
        return JSON.parse(techHistory);
    } catch (e) {
        console.error("[localStorage Error] ", e);
        return [];
    }
}

export function setTechHistory(ids: string[]): void {
    try {
        localStorage.setItem(TECH_HISTORY_KEY, JSON.stringify(ids));
    } catch (e) {
        console.error("[localStorage Error] ", e);
    }
}

export function getDailyHistory(): string[] {
    if (typeof window === "undefined") {
        return [];
    }
    const dailyHistory = localStorage.getItem(DAILY_HISTORY_KEY);
    if (!dailyHistory) {
        return [];
    }
    try {
        return JSON.parse(dailyHistory);
    } catch (e) {
        console.error("[localStorage Error] ", e);
        return [];
    }
}

export function setDailyHistory(ids: string[]): void {
    try {
        localStorage.setItem(DAILY_HISTORY_KEY, JSON.stringify(ids));
    } catch (e) {
        console.error("[localStorage Error] ", e);
    }
}
