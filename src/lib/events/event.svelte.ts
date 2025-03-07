import type {Reading} from "$lib/schema";

export enum MissionEventType {
    START = "start",
    CONNECT = "connect",
    DISCONNECT = "disconnect",
    RECEIVE = "receive",
    MALFORMED_RECEIVE = "malformed_receive"
}

export enum ImportanceLevel {
    DEBUG = 1,
    INFO = 2,
    WARNING = 3,
    ERROR = 4,
}

export interface MissionEvent {
    type: MissionEventType
    importance: ImportanceLevel
    timestamp: Date
}

export interface ReceiveEvent extends MissionEvent {
    type: typeof MissionEventType.RECEIVE,
    importance: typeof ImportanceLevel.DEBUG,
    message: Reading
}

export interface StartEvent extends MissionEvent {
    type: typeof MissionEventType.START,
    importance: typeof ImportanceLevel.INFO
}

export interface ConnectEvent extends MissionEvent {
    type: typeof MissionEventType.CONNECT,
    importance: typeof ImportanceLevel.INFO
}

export interface DisconnectEvent extends MissionEvent {
    type: typeof MissionEventType.DISCONNECT,
    importance: typeof ImportanceLevel.INFO
}

export interface MalformedReceiveEvent extends MissionEvent {
    type: typeof MissionEventType.MALFORMED_RECEIVE,
    importance: typeof ImportanceLevel.WARNING,
    phase: "parsing" | "validation"
}

export type AnyMissionEvent = StartEvent | ReceiveEvent | ConnectEvent | DisconnectEvent | MalformedReceiveEvent;

export function emitStartEvent(): void {
    missionEvents.push({type: MissionEventType.START, importance: ImportanceLevel.INFO, timestamp: new Date()});
}
export function emitConnectEvent(): void {
    missionEvents.push({type: MissionEventType.CONNECT, importance: ImportanceLevel.INFO, timestamp: new Date()});
}
export function emitDisconnectEvent(): void {
    missionEvents.push({type: MissionEventType.DISCONNECT, importance: ImportanceLevel.INFO, timestamp: new Date()});
}
export function emitReceiveEvent(message: Reading): void {
    missionEvents.push({type: MissionEventType.RECEIVE, importance: ImportanceLevel.DEBUG, timestamp: new Date(), message: message});
}
export function emitMalformedReceiveEvent(phase: "parsing" | "validation") {
    missionEvents.push({type: MissionEventType.MALFORMED_RECEIVE, importance: ImportanceLevel.WARNING, timestamp: new Date(), phase: phase});
}


export const missionEvents: Array<AnyMissionEvent> = $state([]);