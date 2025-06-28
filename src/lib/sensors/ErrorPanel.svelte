<script lang="ts">
    import {BMP_ERROR, GPS_ERROR, IMU_ERROR, LORA_ERROR, type Reading, SD_ERROR} from "$lib/serial/schema";
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
                <SensorStatusSymbol error={lastReading.error & GPS_ERROR} />
            {/if}
        </td>
    </tr>
    <tr>
        <td>LORA: </td>
        <td>
            {#if lastReading === undefined}
                -
            {:else}
                <SensorStatusSymbol error={lastReading.error & LORA_ERROR} />
            {/if}
        </td>
    </tr>
    <tr>
        <td>SD: </td>
        <td>
            {#if lastReading === undefined}
                -
            {:else}
                <SensorStatusSymbol error={lastReading.error & SD_ERROR} />
            {/if}
        </td>
    </tr>
    <tr>
        <td>BMP: </td>
        <td>
            {#if lastReading === undefined}
                -
            {:else}
                <SensorStatusSymbol error={lastReading.error & BMP_ERROR} />
            {/if}
        </td>
    </tr>
    </tbody>
</table>