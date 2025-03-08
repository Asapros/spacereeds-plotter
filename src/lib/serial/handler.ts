import {SerialConnectionManager} from "$lib/serial/manager.svelte";
import LineAggregatorStream from "$lib/stream/aggregator";
import JsonParserStream from "$lib/stream/json-parser";
import StructureValidatorStream from "$lib/stream/validator";
import {type Reading, ReadingSchema} from "$lib/schema";
import {
    type ConnectEvent,
    emitConnectEvent,
    emitDisconnectEvent,
    emitMalformedReceiveEvent,
    emitReceiveEvent,
    getLastEvent,
    MissionEventType
} from "$lib/events/event.svelte";

class ReadingHandlerStream extends WritableStream<Reading> {
    constructor() {
        super({
            write(chunk: Reading, controller: WritableStreamDefaultController) {
                emitReceiveEvent(chunk);
            },
        });
    }
}

export const serialManager = new SerialConnectionManager()

const MALFORMED_THRESHOLD: number = 213.7;

function isMalformedReceiveSus(): boolean {
    const lastConnect: ConnectEvent | undefined = getLastEvent(MissionEventType.CONNECT);
    if (lastConnect === undefined) return true;

    const timeSinceConnect: number = Date.now() - getLastEvent(MissionEventType.CONNECT)!.timestamp;
    return timeSinceConnect > MALFORMED_THRESHOLD;
}

function onParsingError() { emitMalformedReceiveEvent("parsing", isMalformedReceiveSus()); }
function onValidationError() { emitMalformedReceiveEvent("validation", isMalformedReceiveSus()); }

export async function startHandlingSerial() {
    await serialManager.openSerial([new TextDecoderStream(), new LineAggregatorStream(), new JsonParserStream(onParsingError), new StructureValidatorStream(ReadingSchema, onValidationError)], new ReadingHandlerStream())
    emitConnectEvent()
}

export async function stopHandlingSerial() {
    await serialManager.closeSerial()
    emitDisconnectEvent()
}