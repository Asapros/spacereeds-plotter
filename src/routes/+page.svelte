<script lang="ts">
    import LineAggregatorStream from "$lib/transformers/aggregator";
    import JsonParserStream from "$lib/transformers/json-parser";
    import StructureValidatorStream from "$lib/transformers/validator";
    import {type Reading, ReadingSchema} from "$lib/schema";

    async function openSerial() {
        let port: SerialPort
        try {
            port = await navigator.serial.requestPort();
        } catch (error) {
            console.error(error);
            return;
        }
        await port.open({ baudRate: 9600 });
        const reader = port.readable
            .pipeThrough(new TextDecoderStream())
            .pipeThrough(new LineAggregatorStream())
            .pipeThrough(new JsonParserStream())
            .pipeThrough(new StructureValidatorStream(ReadingSchema))
            .getReader();
        while (true) {
            const { done, value }: ReadableStreamReadResult<Reading> = await reader.read();
            console.log(value);
        }
        reader.releaseLock()
        await port.close()
    }
</script>
<button on:click|preventDefault={openSerial} disabled={!("serial" in navigator)}>CONNECT</button>
