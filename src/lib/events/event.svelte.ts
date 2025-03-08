import type {Reading} from "$lib/schema";

export enum MissionEventType {
    START = "start",
    CONNECT = "connect",
    DISCONNECT = "disconnect",
    RECEIVE = "receive",
    MALFORMED_RECEIVE = "malformed_receive",
    INTERRUPT = "interrupt"
}

export enum ImportanceLevel {
    DEBUG = 1,
    INFO = 2,
    WARNING = 3,
    ERROR = 4,
}
export const LEVEL_NAMES: Map<ImportanceLevel, string> = new Map([
    [ImportanceLevel.DEBUG, "DEBUG"],
    [ImportanceLevel.INFO, "INFO"],
    [ImportanceLevel.WARNING, "WARNING"],
    [ImportanceLevel.ERROR, "ERROR"],
])

export interface MissionEvent<T extends MissionEventType> {
    type: T
    importance: ImportanceLevel
    timestamp: number
}

export interface ReceiveEvent extends MissionEvent<MissionEventType.RECEIVE> {
    message: Reading
}

export interface StartEvent extends MissionEvent<MissionEventType.START> {}

export interface ConnectEvent extends MissionEvent<MissionEventType.CONNECT> {}

export interface DisconnectEvent extends MissionEvent<MissionEventType.DISCONNECT> {}

export interface InterruptEvent extends MissionEvent<MissionEventType.INTERRUPT> {}

export interface MalformedReceiveEvent extends MissionEvent<MissionEventType.MALFORMED_RECEIVE> {
    phase: "parsing" | "validation"
}

export type AnyMissionEvent = ReceiveEvent | StartEvent | ConnectEvent | DisconnectEvent | MalformedReceiveEvent | InterruptEvent

export function emitStartEvent(): void {
    missionEvents.push({type: MissionEventType.START, importance: ImportanceLevel.INFO, timestamp: Date.now()});
}
export function emitConnectEvent(): void {
    missionEvents.push({type: MissionEventType.CONNECT, importance: ImportanceLevel.INFO, timestamp: Date.now()});
}
export function emitDisconnectEvent(): void {
    missionEvents.push({type: MissionEventType.DISCONNECT, importance: ImportanceLevel.INFO, timestamp: Date.now()});
}
export function emitInterruptEvent(): void {
    missionEvents.push({type: MissionEventType.INTERRUPT, importance: ImportanceLevel.WARNING, timestamp: Date.now()});
}
export function emitReceiveEvent(message: Reading): void {
    missionEvents.push({type: MissionEventType.RECEIVE, importance: ImportanceLevel.DEBUG, timestamp: Date.now(), message: message});
}
export function emitMalformedReceiveEvent(phase: "parsing" | "validation", sus: boolean) {
    missionEvents.push({type: MissionEventType.MALFORMED_RECEIVE, importance: sus ? ImportanceLevel.WARNING : ImportanceLevel.DEBUG, timestamp: Date.now(), phase: phase});
}


export const missionEvents: Array<AnyMissionEvent> = $state([]);

export function getLastEvent<T extends MissionEventType>(type: T): MissionEvent<T> | undefined {
    return missionEvents.filter((event) => event.type === type).at(-1) as MissionEvent<T> | undefined;
}

export function clearLogs(): void {
    while (missionEvents.length > 0) missionEvents.pop();
}
export function setLogs(logs: Array<AnyMissionEvent>): void {
    clearLogs()
    for (const event of logs) {
        missionEvents.push(event);
    }
}
