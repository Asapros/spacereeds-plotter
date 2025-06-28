<script lang="ts">
    import {ImportanceLevel, LEVEL_NAMES, missionEvents, MissionEventType} from "$lib/events/event.svelte";
    import ImportanceSymbol from "$lib/events/ImportanceSymbol.svelte";
    import EventLine from "$lib/events/EventLine.svelte";
    import {saveLogsToFile} from "$lib/events/storage";
    import EventExportButton from "$lib/events/EventExportButton.svelte";

    const DEFAULT_LOG_LEVEL: number = 2;
    let logLevel: number | undefined = $state();
</script>

<div>
    <section id="control">
        <label for="log-level">Filtr: </label>
        <select name="log-level" bind:value={logLevel} >
            {#each LEVEL_NAMES.keys() as level}
                <option value={level} selected={level === DEFAULT_LOG_LEVEL}>
                    {LEVEL_NAMES.get(level)}
                </option>
            {/each}
        </select>
        <EventExportButton />
    </section>
    <section id="logs">
        <table>
            <tbody>
            {#each missionEvents.toReversed().filter((event) => event.importance >= (logLevel ?? DEFAULT_LOG_LEVEL)) as event}
                <tr>
                    <EventLine event={event} />
                </tr>
            {/each}
            </tbody>
        </table>
    </section>
</div>
<style>
    div {
        height: 100%;
        max-height: 100%;
        overflow: hidden;
        display: flex;
        flex-direction: column;
    }
    section#logs {
        flex-grow: 1;
        overflow-y: auto;
        overflow-x: hidden;
    }
</style>