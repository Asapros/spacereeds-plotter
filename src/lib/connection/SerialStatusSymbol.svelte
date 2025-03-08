<script>
import {serialManager} from "$lib/serial/handler.js";
import {SerialState} from "$lib/serial/manager.svelte.js";
</script>

{#if serialManager.state === SerialState.OPEN}
    POŁĄCZONO
{:else if serialManager.state === SerialState.CLOSING}
    ROZŁĄCZANIE...
{:else if serialManager.state === SerialState.FREE}
    ROZŁĄCZONO
{/if}
