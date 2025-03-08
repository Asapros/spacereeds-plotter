<script lang="ts">
    import {getLastReading} from "$lib/sensors/reading";
    import type {Reading} from "$lib/serial/schema";

    let lastSignal: number | undefined = $derived(getLastReading()?.signal);
</script>

{#if lastSignal === undefined}
    -
{:else}
    <meter value={23} max={100}></meter> [D]
{/if}

<style>
    meter::-webkit-meter-optimum-value {
        background: red;
    }
</style>