<script lang="ts">
    import {SerialConnectionManager, SerialState} from "$lib/serial/manager.svelte.js";
    import {serialManager, startHandlingSerial, stopHandlingSerial} from "$lib/serial/handler";
    import {missionEvents, MissionEventType} from "$lib/events/event.svelte";

    let lastReceive: Date | undefined = $derived(missionEvents.filter((event) => event.type === MissionEventType.RECEIVE).at(-1)?.timestamp);
</script>

<p>
    Status:
    {#if serialManager.state === SerialState.OPEN}
        POŁĄCZONO
    {:else if serialManager.state === SerialState.CLOSING}
        ROZŁĄCZANIE...
    {:else if serialManager.state === SerialState.FREE}
        ROZŁĄCZONO
    {/if}
</p>
<p>
    Ostatni pakiet:
    {#if lastReceive !== undefined}
        {lastReceive.toLocaleTimeString()}
    {:else}
        -
    {/if}
</p>
{#if serialManager.state === SerialState.FREE}
    <button onclick={startHandlingSerial}>POŁĄCZ</button>
{:else if serialManager.state === SerialState.OPEN}
    <button onclick={stopHandlingSerial}>ROZŁĄCZ</button>
{:else if serialManager.state === SerialState.CLOSING}
    <button disabled>ROZŁĄCZ</button>
{/if}