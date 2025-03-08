<script lang="ts">
    import ConnectionPanel from "$lib/connection/ConnectionPanel.svelte";
    import EventLog from "$lib/events/EventLog.svelte";
    import {onDestroy, onMount} from "svelte";
    import {loadLogsFromLocalStorage, saveLogsToLocalStorage} from "$lib/events/storage";
    import {emitInterruptEvent, missionEvents} from "$lib/events/event.svelte";
    import NewMissionButton from "$lib/mission/NewMissionButton.svelte";
    import {newMission} from "$lib/mission/initialize";
    import NumericSensorPanel from "$lib/sensors/NumericSensorPanel.svelte";


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
</nav>
<article>
    <h1>Port Szeregowy</h1>
    <ConnectionPanel />
    <h1>Dziennik Zdarzeń</h1>
    <EventLog />
    <h1>Odczyty</h1>
    <NumericSensorPanel />
</article>
<style>
    h1 {
        font-family: "Comic Sans MS", serif;
    }
</style>