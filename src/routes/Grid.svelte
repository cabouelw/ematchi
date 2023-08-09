<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import Square from './Square.svelte';

	export let grid: string[];
	export let found: string[];

    const dispatch = createEventDispatcher();

	let a = -1;
	let b = -1;
    let resetTimout: number;

	export function reset() {
		a = b = -1;
	}
</script>

<div class="grid">
	{#each grid as emoji, i}
		<Square
			{emoji}
			on:click={() => {
                clearTimeout(resetTimout);
				if (a === -1 && b === -1) {
					a = i;
				} else if (b === -1) {
                    b = i;
                    if (grid[a] === grid[i]) {
                        dispatch('found', { emoji });
                    } else {
                        resetTimout = setTimeout(() => {
                            a = b = -1;
                        }, 1000);
                    }
                } else {
                    a = i;
                    b = -1;
                }
			}}
            selected={i === a || i === b}
            found={found.includes(emoji)}
			group={grid.indexOf(emoji) === i ? 'a' : 'b'}
		/>
	{/each}
</div>

<style>
	.grid {
		display: grid;
		grid-template-columns: repeat(var(--size), 1fr);
		grid-template-rows: repeat(var(--size), 1fr);
		grid-gap: 10px;
		width: 100%;
		height: 100%;

		perspective: 100vw;
	}
</style>
