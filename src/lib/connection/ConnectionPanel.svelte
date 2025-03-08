<script lang="ts">
    import {getLastEvent, MissionEventType, type ReceiveEvent} from "$lib/events/event.svelte";
    import ConnectButton from "$lib/connection/ConnectButton.svelte";
    import SerialStatusSymbol from "$lib/connection/SerialStatusSymbol.svelte";
    import {onDestroy} from "svelte";
    import {SvelteDate} from "svelte/reactivity";
    import LastReceiveTime from "$lib/connection/LastReceiveTime.svelte";

</script>

<p>
    Status: <SerialStatusSymbol />
</p>
<p>
    Ostatni pakiet: <LastReceiveTime />
</p>

<ConnectButton />