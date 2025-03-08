import {emitStartEvent, missionEvents} from "$lib/events/event.svelte";
import {serialManager} from "$lib/serial/handler";
import {SerialState} from "$lib/serial/manager.svelte";

export function newMission() {
    emitStartEvent()
}

export async function resetMission() {
    while (missionEvents.length > 0) {
        missionEvents.pop()
    }
    if (serialManager.state === SerialState.OPEN) {
        await serialManager.closeSerial()
    }
    newMission()
}

export async function newMissionRequest() {
    let sure: boolean = confirm("Czy na pewno chcesz rozpocząć nową misję? Nie wyeksportowane zdarzenia zostaną trwale nadpisane!")
    if (!sure) return;
    await resetMission();
}
