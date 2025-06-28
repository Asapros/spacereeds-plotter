<script lang="ts">
    import {getLastEvent, MissionEventType, type ReceiveEvent} from "$lib/events/event.svelte";
    import ConnectButton from "$lib/connection/ConnectButton.svelte";
    import SerialStatusSymbol from "$lib/connection/SerialStatusSymbol.svelte";
    import {onDestroy} from "svelte";
    import {SvelteDate} from "svelte/reactivity";
    import LastReceiveTime from "$lib/connection/LastReceiveTime.svelte";
    import SignalMeter from "$lib/connection/SignalMeter.svelte";
    import {serialManager} from "$lib/serial/handler";
    import {SerialState} from "$lib/serial/manager.svelte";
    import TestEventButton from "$lib/events/MockEventReceive.svelte";

    let mock: boolean = false;
</script>

<table>
    <tbody>
    <tr>
        <td>Status:</td>
        <td><SerialStatusSymbol /></td>
    </tr>
    <tr>
        <td>Moc sygnału:</td>
        <td><SignalMeter /></td>
    </tr>
    <tr>
        <td>Ostatni Pakiet:</td>
        <td><LastReceiveTime /></td>
    </tr>
    </tbody>
</table>
<label>
    <input type="checkbox" bind:checked={mock} disabled={serialManager.state === SerialState.OPEN}>
    Mock
</label>
{#if !mock}
    <ConnectButton />
{:else}
    <TestEventButton />
{/if}

<style>
    label {
        text-align: right;
    }
</style>