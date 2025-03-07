<script lang="ts">
    import ConnectionPanel from "$lib/connection/ConnectionPanel.svelte";
    import EventLog from "$lib/events/EventLog.svelte";
</script>

<h1>Port Szeregowy</h1>
<ConnectionPanel />
<h1>Dziennik Zdarzeń</h1>
<EventLog />

<style>
    h1 {
        font-family: "Comic Sans MS", serif;
    }
</style>