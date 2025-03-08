<script lang="ts">
    import {getLastEvent, MissionEventType, type ReceiveEvent} from "$lib/events/event.svelte";
    import type {Reading} from "$lib/schema";

    let lastReceive: ReceiveEvent | undefined = $derived(getLastEvent(MissionEventType.RECEIVE) as ReceiveEvent | undefined);
    let lastReading: Reading | undefined = $derived(lastReceive?.message);

</script>

<table>
    <tbody>
        <tr>
            <td>Stan z:</td>
            <td>
                {#if lastReceive === undefined}
                    -
                {:else}
                    {new Date(lastReceive.timestamp).toLocaleTimeString()}
                {/if}
            </td>
        </tr>
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