<script>
import {saveLogsToFile} from "$lib/events/storage.js";
import {missionEvents} from "$lib/events/event.svelte.js";
</script>

<button onclick={saveLogsToFile} disabled={missionEvents.length === 0}>EKSPORTUJ</button>
