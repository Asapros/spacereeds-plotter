import {clearLogs, emitStartEvent, missionEvents} from "$lib/events/event.svelte";
import {serialManager} from "$lib/serial/handler";
import {SerialState} from "$lib/serial/manager.svelte";

export function newMission() {
    emitStartEvent();
}

export async function resetMission() {
    clearLogs();
    if (serialManager.state === SerialState.OPEN) {
        await serialManager.closeSerial();
    }
    newMission();
}

export async function newMissionRequest() {
    let sure: boolean = confirm("Czy na pewno chcesz rozpocząć nową misję? Niewyeksportowane zdarzenia zostaną trwale nadpisane!")
    if (!sure) return;
    await resetMission();
}
