<script lang="ts">
	import { get_twemoji_url } from "./utils";
    import { send  } from "./transitions";

	export let emoji: string;
	export let selected: boolean;
	export let found: boolean;
	export let group: 'a' | 'b';
</script>

<div class="square" class:flepped={selected} class:found={found}>
    <button on:click />
    <div class="back" />
    {#if !found}
        <img alt={emoji} src={get_twemoji_url(emoji) }
            out:send={{ key: emoji+ ':' + group }}
        />
    {/if}
</div>

<style>
	.square {
        display: flex;
        justify-content: center;
        align-items: center;
        position: relative;
		width: 100%;
		height: 100%;
		border-radius: 1rem;
        transform-style: preserve-3d;
        transition:  transform 0.5s;
        background-color: #000;
	}

    .found {
        transform: rotateY(180deg);
        background-color: #000;
        border: 0.2em solid #444444;
    }

    .flepped {
        transform: rotateY(180deg);
        background-color: #000;
        border: 0.2em solid #9900ff;
    }

    button {
        position: absolute;
        width: 100%;
        height: 100%;
        backface-visibility: hidden;
        background-color: #4e4e4e;
        border: none;
        border-radius: 1rem;
        font-size: inherit;
    }

    .back {
        position: absolute;
        background-color: #000;
        transform: rotateY(180deg);
        border-radius: 1rem;
        backface-visibility: hidden;
        width: 100%;
        height: 100%;

    }

    img {
        position: relative;
        width: 5em;
        height: 5em;
        pointer-events: none;
        transform: rotateY(180deg);
        backface-visibility: hidden;
    }
</style>
