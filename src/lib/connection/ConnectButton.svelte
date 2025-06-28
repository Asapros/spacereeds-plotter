<script lang="ts">
    import {serialManager, startHandlingSerial, stopHandlingSerial} from "$lib/serial/handler.js";
    import {SerialState} from "$lib/serial/manager.svelte";
</script>
{#if !serialManager.isAvailable()}
    <button disabled>POŁĄCZ</button>
{:else if serialManager.state === SerialState.FREE}
    <button onclick={startHandlingSerial}>POŁĄCZ</button>
{:else if serialManager.state === SerialState.OPEN}
    <button onclick={stopHandlingSerial}>ROZŁĄCZ</button>
{:else if serialManager.state === SerialState.CLOSING}
    <button disabled>ROZŁĄCZ</button>
{/if}

<style>
    button {
        padding: 50px;
        margin: 50px;
        font-size: 30px;
        box-shadow: 0 8px 12px 0 rgba(0,0,0,0.5);
        font-family: inherit;
    }
    button:active:enabled {
        box-shadow: none;
    }
</style>
