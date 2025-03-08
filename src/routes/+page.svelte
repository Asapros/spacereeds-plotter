<script lang="ts">
    import ConnectionPanel from "$lib/connection/ConnectionPanel.svelte";
    import EventLog from "$lib/events/EventLog.svelte";
    import {onMount} from "svelte";
    import {loadLogsFromLocalStorage, saveLogsToLocalStorage} from "$lib/events/storage";
    import {missionEvents} from "$lib/events/event.svelte";
    import NewMissionButton from "$lib/mission/NewMissionButton.svelte";
    import {newMission} from "$lib/mission/initialize";
    import NumericSensorPanel from "$lib/sensors/NumericSensorPanel.svelte";


    onMount(async () => {
        loadLogsFromLocalStorage()
        if (missionEvents.length === 0) newMission();

        $effect(() => {saveLogsToLocalStorage()})
    })
</script>
<NewMissionButton />
<h1>Port Szeregowy</h1>
<ConnectionPanel />
<h1>Dziennik Zdarzeń</h1>
<EventLog />
<h1>Odczyty</h1>
<NumericSensorPanel />

<style>
    h1 {
        font-family: "Comic Sans MS", serif;
    }
</style>