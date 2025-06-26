<script lang="ts">
    import {emitReceiveEvent} from "$lib/events/event.svelte.js";
    import type {Reading} from "$lib/serial/schema";

    // export const ReadingSchema = z.object({
    //     orientation: CoordinateSchema,
    //     position: CoordinateSchema,
    //     acceleration: CoordinateSchema,
    //     temperature: z.number(),
    //     internal_temperature: z.number(),
    //     pressure: z.number(),
    //     signal: z.number()
    // })

    const MESSAGE: Reading = {
        orientation: {x: 0, y: 0, z: 0},
        position: {x: 0, y: 0, z: 0},
        acceleration: {x: 0, y: 0, z: 0},
        temperature: 0,
        internal_temperature: 0,
        pressure: 0,
        signal: 0,
        error: 0,
        message: "Hello, world!"
    };
</script>

<button onclick={() => emitReceiveEvent(MESSAGE)}>TEST</button>