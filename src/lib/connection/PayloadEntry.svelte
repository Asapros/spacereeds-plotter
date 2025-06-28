<script lang="ts">

    import {serialManager} from "$lib/serial/handler";
    import {SerialState} from "$lib/serial/manager.svelte";
    import {emitPayloadSendEvent} from "$lib/events/event.svelte";

    let payload: string = $state("");

    async function sendPayload(event: SubmitEvent) {
        event.preventDefault();
        await serialManager.sendPayload(payload);
        emitPayloadSendEvent(payload);
        payload = "";
    }
</script>

<form onsubmit={sendPayload}>
    <label for="payload">Transmisja: </label>
    <input name="payload" autocomplete="off" type="text" bind:value={payload}>
    <input type="submit" disabled={serialManager.state !== SerialState.OPEN || payload.length === 0}>
</form>

<style>
    form {
        margin: 4px;
    }
    input[type=submit] {
        box-shadow: 0 8px 12px 0 rgba(0,0,0,0.2);
        font-family: inherit;
    }
    input[type=submit]:active:enabled {
        box-shadow: none;
    }
</style>
