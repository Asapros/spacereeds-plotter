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
        box-shadow: 0 8px 12px 0 rgba(0,0,0,0.5);
        font-family: inherit;
    }
</style>