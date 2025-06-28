<script lang="ts">
    import ConnectionPanel from "$lib/connection/ConnectionPanel.svelte";
    import EventLog from "$lib/events/EventLog.svelte";
    import {onDestroy, onMount} from "svelte";
    import {loadLogsFromLocalStorage, saveLogsToLocalStorage} from "$lib/events/storage";
    import {emitInterruptEvent, missionEvents} from "$lib/events/event.svelte";
    import NewMissionButton from "$lib/mission/NewMissionButton.svelte";
    import {newMission} from "$lib/mission/initialize";
    import NumericSensorPanel from "$lib/sensors/NumericSensorPanel.svelte";
    import ErrorPanel from "$lib/sensors/ErrorPanel.svelte";
    import PositionPanel from "$lib/sensors/PositionPanel.svelte";
    import TestEventButton from "$lib/events/TestEventButton.svelte";
    import MovementPanel from "$lib/sensors/MovementPanel.svelte";


    function onMissionInterrupt() {
        emitInterruptEvent()
    }

    onMount(async () => {
        loadLogsFromLocalStorage()
        if (missionEvents.length === 0) newMission();

        $effect(() => {saveLogsToLocalStorage()})
        window.addEventListener("beforeunload", onMissionInterrupt)
    })
</script>
<nav>
    <NewMissionButton />
    <TestEventButton />
</nav>
<article>
    <div>
        <div id="event-log" class="card">
            <h1>Dziennik Zdarzeń</h1>
            <EventLog />
        </div>
    </div>
    <div>
        <div id="serial-port" class="card">
            <h1>Port Szeregowy</h1>
            <ConnectionPanel />
        </div>
        <div id="numeric-readings" class="card">
            <h1>Odczyty</h1>
            <NumericSensorPanel />
        </div>
        <div id="error-readings" class="card">
            <h1>Stan modułów</h1>
            <ErrorPanel />
        </div>
    </div>
    <div>
        <div class="card">
            <h1>Ruch</h1>
            <MovementPanel />
        </div>
        <div class="card">
            <h1>Położenie</h1>
            <PositionPanel />
        </div>
    </div>
</article>
<style>
    * {
        font-family: "Times New Roman",serif;
    }
    nav {
        display: flex;
        justify-content: center;
        margin: 10px;
    }
    article {
        flex-grow: 1;
        overflow: hidden;
        margin: 10px;
        display: flex;
    }
    article>div {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        padding-inline: 10px;
    }
    .card {
        border-style: dashed;
        padding: 10px;
        margin: 10px;
        flex: 1 0 auto;
        overflow: hidden;
        display: flex;
        flex-direction: column;
    }
</style>