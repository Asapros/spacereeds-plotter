<script lang="ts">
    import {ImportanceLevel, LEVEL_NAMES} from "$lib/events/event.svelte";

    interface Props {
        level: ImportanceLevel
    }
    let { level }: Props = $props();

    let levelName = $derived(LEVEL_NAMES.get(level))
</script>

<span class={levelName}>{levelName}</span>

<style>
    span {
        color: black;
    }
    span.DEBUG {
        background-color: pink;
    }
    span.INFO {
        background-color: deepskyblue;
    }
    span.WARNING {
        background-color: yellow;
    }
    span.ERROR {
        background-color: red;
    }
</style>