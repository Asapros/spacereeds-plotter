<script>
import {serialManager} from "$lib/serial/handler.js";
import {SerialState} from "$lib/serial/manager.svelte.js";
</script>

{#if serialManager.state === SerialState.OPEN}
    <span id="connected">POŁĄCZONO</span>
{:else if serialManager.state === SerialState.CLOSING}
    <span id="disconnecting">ROZŁĄCZANIE...</span>
{:else if serialManager.state === SerialState.FREE}
    <span id="disconnected">ROZŁĄCZONO</span>
{/if}

<style>
    span#connected {
        color: green;
    }
    span#disconnecting {
        color: yellow;
    }
    span#disconnected {
        color: red;
    }
</style>
