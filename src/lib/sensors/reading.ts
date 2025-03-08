import type {Reading} from "$lib/serial/schema";
import {getLastEvent, MissionEventType, type ReceiveEvent} from "$lib/events/event.svelte";

export function getLastReceive(): ReceiveEvent | undefined {
    return getLastEvent(MissionEventType.RECEIVE) as ReceiveEvent | undefined
}

export function getLastReading(): Reading | undefined {
    return getLastReceive()?.message;
}