<script lang="ts">
    import {getLastEvent, MissionEventType, type ReceiveEvent} from "$lib/events/event.svelte";
    import ConnectButton from "$lib/connection/ConnectButton.svelte";
    import SerialStatusSymbol from "$lib/connection/SerialStatusSymbol.svelte";
    import {onDestroy} from "svelte";
    import {SvelteDate} from "svelte/reactivity";
    import LastReceiveTime from "$lib/connection/LastReceiveTime.svelte";
    import SignalMeter from "$lib/connection/SignalMeter.svelte";
    import {serialManager} from "$lib/serial/handler";

</script>

{#if serialManager.isAvailable()}
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

<ConnectButton />
{:else}
    <p id="serial-unavailable">Przeglądarka nie wspiera portu szeregowego</p>
{/if}

<style>
    p#serial-unavailable {
        color: red;
        font-style: italic;
    }
</style>