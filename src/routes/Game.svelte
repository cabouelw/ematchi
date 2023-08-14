<script lang="ts">
	import { createEventDispatcher, onMount } from 'svelte';
	import Countdown from './Countdown.svelte';
	import Found from './Found.svelte';
	import Grid from './Grid.svelte';
	import type { Level } from './levels';
	import { shuffle } from './utils';

	const dispatch = createEventDispatcher();

	let size: number;
	let grid: string[] = [];
	let found: string[] = [];
	let remaining = 0;
	let duration = 0;
	let playing = false;
	let grid_cp: Grid;

	export function start(level: Level) {
		size = level.size;
		grid = create_grid(level);
		remaining = duration = level.duration;
		resume();
	}

	export function resume() {
		playing = true;
		countdown();

		dispatch('play');
	}

	export function quit() {
		playing = false;
		grid_cp.reset();
		dispatch('lost');
	}

	function create_grid(levle: Level) {
		const copy = levle.emojis.slice();
		const pairs: string[] = [];
		let i = 0;

		while (i < levle.size ** 2 / 2) {
			const index = Math.floor(Math.random() * copy.length);
			const emoji = copy.splice(index, 1)[0];
			pairs.push(emoji);
			pairs.push(emoji);
			i++;
		}
		return shuffle(pairs);
	}

	function countdown() {
		const start = Date.now();
		let remaining_at_start = remaining;
		function loop() {
			if (!playing) return;
			requestAnimationFrame(loop);
			remaining = remaining_at_start - (Date.now() - start);

			if (remaining <= 0) {
				dispatch('lost');
				found = [];
				grid_cp.reset();
				playing = false;
			}
		}
		loop();
	}
</script>

<div class="game" style="--size: {size}">
	<div class="info">
		{#if playing}
			<Countdown
				{remaining}
				{duration}
				on:click={() => {
					playing = false;
					dispatch('pause');
				}}
			/>
		{/if}
	</div>
	<div class="grid-container">
		<Grid
			bind:this={grid_cp}
			{found}
			{grid}
			on:found={(e) => {
				found.push(e.detail.emoji);
				found = found;
				if (found.length === size ** 2 / 2) {
					dispatch('won');
					found = [];
					grid_cp.reset();
				}
			}}
		/>
	</div>
	<div class="info">
		<Found {found} />
	</div>
</div>

<style>
	.game {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		height: 100%;
		font-size: min(1vmin, 0.7rem);
		background-color: #0d0226;
	}

	.info {
		width: 80em;
		height: 10em;
	}

	.grid-container {
		display: grid;
		grid-gap: 10px;
		width: 80em;
		height: 80em;
	}
	@media screen and (max-width: 768px) {
		.info {
			height: 17em;
		}

	}
</style>
