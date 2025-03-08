<script lang="ts">
    import {getLastEvent, MissionEventType, type ReceiveEvent} from "$lib/events/event.svelte";
    import type {Reading} from "$lib/serial/schema";
    import {getLastReading, getLastReceive} from "$lib/sensors/reading";

    let lastReading: Reading | undefined = $derived(getLastReading());
</script>

<table>
    <tbody>
        <tr>
            <td>Temp. zewnętrzna:</td>
            <td>
                {#if lastReading === undefined}
                    -
                {:else}
                    {lastReading.temperature} &deg;C
                {/if}
            </td>
        </tr>
        <tr>
            <td>Temp. wewnętrzna:</td>
            <td>
                {#if lastReading === undefined}
                    -
                {:else}
                    {lastReading.internal_temperature} &deg;C
                {/if}
            </td>
        </tr>
        <tr>
            <td>Ciśnienie:</td>
            <td>
                {#if lastReading === undefined}
                    -
                {:else}
                    {lastReading.pressure} hPa
                {/if}
            </td>
        </tr>
    </tbody>
</table>
