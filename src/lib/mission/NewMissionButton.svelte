<script lang="ts">
    import {newMissionRequest, resetMission} from "$lib/mission/initialize";
</script>

<button onclick={newMissionRequest}>NOWA MISJA</button>

<style>
    button {
        height: 100%;
        width: 30%;
        font-size: 20px;
        padding: 10px;
    }
</style>