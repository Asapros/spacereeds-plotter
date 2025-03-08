<script lang="ts">
    import ConnectionPanel from "$lib/connection/ConnectionPanel.svelte";
    import EventLog from "$lib/events/EventLog.svelte";
    import {onMount} from "svelte";
    import {loadLogs, saveLogs} from "$lib/events/storage";
    import {missionEvents} from "$lib/events/event.svelte";
    import NewMissionButton from "$lib/mission/NewMissionButton.svelte";
    import {newMission} from "$lib/mission/initialize";


    onMount(async () => {
        loadLogs()
        if (missionEvents.length === 0) newMission();

        $effect(() => {saveLogs()})
    })
</script>
<NewMissionButton />
<h1>Port Szeregowy</h1>
<ConnectionPanel />
<h1>Dziennik Zdarzeń</h1>
<EventLog />

<style>
    h1 {
        font-family: "Comic Sans MS", serif;
    }
</style>