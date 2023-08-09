<script lang="ts">
	import { receive } from "./transitions";
	import { get_twemoji_url } from "./utils";

    export let found: string[] = [];
</script>

<div class="found" >
    {#each found as emoji}
        <div class="pair">
        <img alt={emoji} src={get_twemoji_url(emoji)}
        in:receive={{ key: emoji+':a' }}
        />
        <img alt={emoji} src={get_twemoji_url(emoji)}
        in:receive={{ key: emoji+':b' }}
        /></div>
    {/each}
</div>

<style>
    .found {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 2em;
        height: 100%;
        filter: drop-shadow(0.2em 0.2em 0.5em rgba(0, 0, 0, 0.2));
    }

    .pair {
        display: flex;
        justify-content: center;
        align-items: center;
        position: relative;
        width: 4em;
        height: 4em;
        padding: 1em;
        border-radius: 50%;
    }

    img {
        position: absolute;
        width: 5em;
        height: 5em;
    }
</style>