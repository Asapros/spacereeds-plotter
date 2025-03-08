<script lang="ts">
    import ImportanceSymbol from "$lib/events/ImportanceSymbol.svelte";
    import type {AnyMissionEvent} from "$lib/events/event.svelte";
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
    {#if event.type === "connect"}
        Połączono
    {:else if event.type === "disconnect"}
        Rozłączono
    {:else if event.type === "malformed_receive"}
        Otrzymano nieprawidłowy odczyt
    {:else if event.type === "receive"}
        Otrzymano odczyt: {JSON.stringify(event.message)}
    {:else if event.type === "start"}
        Rozpoczęto misję
    {/if}
</td>
