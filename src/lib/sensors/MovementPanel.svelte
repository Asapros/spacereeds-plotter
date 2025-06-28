<script lang="ts">
    import {BMP_ERROR, GPS_ERROR, IMU_ERROR, LORA_ERROR, type Reading, SD_ERROR} from "$lib/serial/schema";
    import {getLastReading, getLastReceive} from "$lib/sensors/reading";
    import SensorStatusSymbol from "$lib/sensors/ModuleStatusSymbol.svelte";

    let lastReading: Reading | undefined = $derived(getLastReading());
</script>

<div>
<table>
    <tbody>
    <tr>
        <td>IMU: </td>
        <td>
            {#if lastReading === undefined}
                -
            {:else}
                <SensorStatusSymbol error={lastReading.error & IMU_ERROR} />
            {/if}
        </td>
    </tr>
    <tr>
        <td>Roll:</td>
        <td>
            {#if lastReading === undefined}
                -
            {:else}
                {lastReading.orientation.x} &deg;/s
            {/if}
        </td>
    </tr>
    <tr>
        <td>Pitch:</td>
        <td>
            {#if lastReading === undefined}
                -
            {:else}
                {lastReading.orientation.y} &deg;/s
            {/if}
        </td>
    </tr>
    <tr>
        <td>Yaw:</td>
        <td>
            {#if lastReading === undefined}
                -
            {:else}
                {lastReading.orientation.z} &deg;/s
            {/if}
        </td>
    </tr>
    <tr>
        <td class="axis-x">X:</td>
        <td>
            {#if lastReading === undefined}
                -
            {:else}
                {lastReading.acceleration.x} m/s&#xb2;
            {/if}
        </td>
    </tr>
    <tr>
        <td class="axis-y">Y:</td>
        <td>
            {#if lastReading === undefined}
                -
            {:else}
                {lastReading.acceleration.y} m/s&#xb2;
            {/if}
        </td>
    </tr>
    <tr>
        <td class="axis-z">Z:</td>
        <td>
            {#if lastReading === undefined}
                -
            {:else}
                {lastReading.acceleration.z} m/s&#xb2;
            {/if}
        </td>
    </tr>
    </tbody>
</table>
<img src="reediag.png" width="30%">
</div>

<style>
    div {
        display: flex;
        align-items: flex-start;
        gap: 1rem; /* space between table and image */
    }
    .axis-x {
        color: gold;
    }
    .axis-y {
        color: red;
    }
    .axis-z {
        color: green;
    }
</style>