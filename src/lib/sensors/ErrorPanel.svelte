<script lang="ts">
    import {getLastEvent, MissionEventType, type ReceiveEvent} from "$lib/events/event.svelte";
    import type {Reading} from "$lib/serial/schema";
    import {getLastReading, getLastReceive} from "$lib/sensors/reading";
    import SensorStatusSymbol from "$lib/sensors/ModuleStatusSymbol.svelte";

    let lastReading: Reading | undefined = $derived(getLastReading());
</script>

<table>
    <tbody>
    <tr>
        <td>GPS: </td>
        <td>
            {#if lastReading === undefined}
                -
            {:else}
                <SensorStatusSymbol error={false} />
            {/if}
        </td>
    </tr>
    <tr>
        <td>IMU: </td>
        <td>
            {#if lastReading === undefined}
                -
            {:else}
                <SensorStatusSymbol error={false} />
            {/if}
        </td>
    </tr>
    <tr>
        <td>SD: </td>
        <td>
            {#if lastReading === undefined}
                -
            {:else}
                <SensorStatusSymbol error={false} />
            {/if}
        </td>
    </tr>
    <tr>
        <td>BMP: </td>
        <td>
            {#if lastReading === undefined}
                -
            {:else}
                <SensorStatusSymbol error={false} />
            {/if}
        </td>
    </tr>
    </tbody>
</table>