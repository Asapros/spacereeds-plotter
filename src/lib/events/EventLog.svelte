<script lang="ts">
    import {ImportanceLevel, missionEvents, MissionEventType} from "$lib/events/event.svelte";

    let logLevel: number | undefined = $state();
</script>

<label for="log-level">Filtr: </label>
<select name="log-level" bind:value={logLevel} >
    <option value=1>DEBUG</option>
    <option value=2 selected>INFO</option>
    <option value=3>WARNING</option>
</select>

<table>
    <tbody>
    {#each missionEvents.toReversed() as event}
        {#if event.importance >= (logLevel ?? 2)}
        <tr>
            <td>[{event.timestamp.toLocaleTimeString()}]</td>
            <td>
                {#if event.importance === ImportanceLevel.DEBUG}
                    DEBUG
                {:else if event.importance === ImportanceLevel.INFO}
                    INFO
                {:else if event.importance === ImportanceLevel.WARNING}
                    WARNING
                {:else if event.importance === ImportanceLevel.ERROR}
                    ERROR
                {/if}
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
                {/if}
            </td>
        </tr>
        {/if}
    {/each}
    </tbody>
</table>