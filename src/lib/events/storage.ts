import {getLastEvent, missionEvents, MissionEventType, setLogs} from "$lib/events/event.svelte";

const STORAGE_KEY: string = "logs"

function dumpLogs(): string {
    return JSON.stringify(missionEvents);
}
function setParsedLogs(data: string): void {
    const parsed = JSON.parse(data);
    setLogs(parsed)
}

export function saveLogsToLocalStorage() {
    localStorage.setItem(STORAGE_KEY, dumpLogs());
}

export function loadLogsFromLocalStorage() {
    const logString: string | null = localStorage.getItem(STORAGE_KEY);
    if (logString === null) {
        return;
    }
    setParsedLogs(logString);
}
export function saveLogsToFile() {
    const blob = new Blob([dumpLogs()], { type: "application/json" }); // Adjust MIME type as needed
    const anchor = document.createElement("a");
    anchor.href = URL.createObjectURL(blob);
    const startDate: Date = new Date(missionEvents[0].timestamp);
    const filename: string = `mission-${startDate.toLocaleDateString()}-${startDate.toLocaleTimeString()}.json`
    anchor.download = filename;
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
}