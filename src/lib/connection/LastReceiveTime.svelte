<script lang="ts">
    import {onDestroy} from "svelte";
    import {getLastEvent, MissionEventType} from "$lib/events/event.svelte";
    import {SvelteDate} from "svelte/reactivity";
    import {getLastReceive} from "$lib/sensors/reading";

    let lastReceiveTimestamp: number | undefined = $derived(getLastReceive()?.timestamp);
    let timeSinceLastReceive: number | undefined = $state(undefined);

    const clock = setInterval(() => {
        if (lastReceiveTimestamp === undefined) {
            timeSinceLastReceive = undefined;
            return;
        }
        timeSinceLastReceive = Date.now() - lastReceiveTimestamp;
        }, 100)

    onDestroy(() => { clearInterval(clock); })

    const WARNING_THRESHOLD: number = 1500;
</script>

{#if timeSinceLastReceive === undefined}
    -
{:else}
    <span class:warning={timeSinceLastReceive > WARNING_THRESHOLD}>{timeSinceLastReceive.toString().padStart(4, "0")} ms</span>
{/if}

<style>
    span.warning {
        color: red;
    }
</style>
