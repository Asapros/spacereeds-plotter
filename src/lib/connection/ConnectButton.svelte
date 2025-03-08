<script lang="ts">
    import {serialManager, startHandlingSerial, stopHandlingSerial} from "$lib/serial/handler.js";
    import {SerialState} from "$lib/serial/manager.svelte";
</script>

{#if serialManager.state === SerialState.FREE}
    <button onclick={startHandlingSerial}>POŁĄCZ</button>
{:else if serialManager.state === SerialState.OPEN}
    <button onclick={stopHandlingSerial}>ROZŁĄCZ</button>
{:else if serialManager.state === SerialState.CLOSING}
    <button disabled>ROZŁĄCZ</button>
{/if}

<style>
    button {
        padding: 5px;
        height: 100%;
        margin: 30px;
        font-size: 20px;
    }
</style>
