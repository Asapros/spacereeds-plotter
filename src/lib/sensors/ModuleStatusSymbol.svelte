<script lang="ts">
    interface Props {
        error: boolean;
    }

    let { error }: Props = $props();
</script>

{#if error}
    <span id="error">Błąd</span>
{:else}
    <span id="healthy">Zdrowy</span>
{/if}

<style>
    span#error {
        color: red
    }
    span#healthy {
        color: lightgreen;
    }
</style>

