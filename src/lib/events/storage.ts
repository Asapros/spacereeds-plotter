import {missionEvents} from "$lib/events/event.svelte";
import {ZodObject} from "zod";

const STORAGE_KEY: string = "logs"

export function saveLogs() {
    const savedLogs: string = JSON.stringify(missionEvents);
    localStorage.setItem(STORAGE_KEY, savedLogs);
}

export function loadLogs() {
    const logString: string | null = localStorage.getItem(STORAGE_KEY);
    if (logString === null) {
        return;
    }
    const loadedLogs = JSON.parse(logString);

    // .push.apply and .concat are not reactive for some reason
    for (const entry of loadedLogs) {
        missionEvents.push(entry)
    }
}
