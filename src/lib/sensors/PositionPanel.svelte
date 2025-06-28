<script lang="ts">
    import {BMP_ERROR, GPS_ERROR, IMU_ERROR, LORA_ERROR, type Reading, SD_ERROR} from "$lib/serial/schema";
    import {getLastReading, getLastReceive} from "$lib/sensors/reading";
    import SensorStatusSymbol from "$lib/sensors/ModuleStatusSymbol.svelte";

    let lastReading: Reading | undefined = $derived(getLastReading());
</script>
<table><tbody><tr>
    <td>GPS: </td>
    <td>
        {#if lastReading === undefined}
            -
        {:else}
            <SensorStatusSymbol error={lastReading.error & GPS_ERROR} />
        {/if}
    </td>
</tr></tbody></table>
{#if lastReading === undefined}
    -
{:else}
    <iframe src="https://maps.google.com/maps?q={lastReading.position.x}, {lastReading.position.y}&z=15&output=embed"></iframe>
{/if}
<style>
    iframe {
        border: none;
        height: 100%;
    }
</style>