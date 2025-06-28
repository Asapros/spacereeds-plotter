<script lang="ts">
    import ImportanceSymbol from "$lib/events/ImportanceSymbol.svelte";
    import {type AnyMissionEvent, MissionEventType} from "$lib/events/event.svelte";
    interface Props {
        event: AnyMissionEvent
    }
    let { event }: Props = $props();
</script>

<td>[{new Date(event.timestamp).toLocaleTimeString()}]</td>
<td>
    <ImportanceSymbol level={event.importance} />
</td>
<td>
    {#if event.type === MissionEventType.CONNECT}
        Połączono
    {:else if event.type === MissionEventType.DISCONNECT}
        {#if event.unexpected}
            Utracono połączenie
        {:else}
            Rozłączono
        {/if}
    {:else if event.type === MissionEventType.MALFORMED_RECEIVE}
        Otrzymano nieprawidłowy odczyt
    {:else if event.type === MissionEventType.RECEIVE}
        Otrzymano odczyt: {JSON.stringify(event.message)}
    {:else if event.type === MissionEventType.START}
        Rozpoczęto misję
    {:else if event.type === MissionEventType.INTERRUPT}
        Przerwano misję
    {:else if event.type === MissionEventType.PAYLOAD_RECEIVE}
        (transmisja) &gt; {event.payload}
    {:else if event.type === MissionEventType.PAYLOAD_SEND}
        [D] (transmisja) &lt; {event.payload}
    {/if}
</td>
