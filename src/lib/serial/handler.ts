import {SerialConnectionManager} from "$lib/serial/manager.svelte";
import LineAggregatorStream from "$lib/stream/aggregator";
import JsonParserStream from "$lib/stream/json-parser";
import StructureValidatorStream from "$lib/stream/validator";
import {type Reading, ReadingSchema} from "$lib/schema";
import {
    emitConnectEvent,
    emitDisconnectEvent,
    emitMalformedReceiveEvent,
    emitReceiveEvent
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

function onParsingError() { emitMalformedReceiveEvent("parsing");}
function onValidationError() { emitMalformedReceiveEvent("validation");}

export async function startHandlingSerial() {
    await serialManager.openSerial([new TextDecoderStream(), new LineAggregatorStream(), new JsonParserStream(onParsingError), new StructureValidatorStream(ReadingSchema, onValidationError)], new ReadingHandlerStream())
    emitConnectEvent()
}

export async function stopHandlingSerial() {
    await serialManager.closeSerial()
    emitDisconnectEvent()
}