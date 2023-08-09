<script lang="ts">
	import '../style.css';
	import Game from './Game.svelte';
	import Modul from './Modul.svelte';
	import { levels } from './levels';
	import { confetti } from '@neoconfetti/svelte';

	let state: 'waiting' | 'playing' | 'won' | 'lost' | 'paused' = 'waiting';
	let game: Game;
</script>

<Game
	bind:this={game}
	on:play={() => {
		state = 'playing';
	}}
	on:pause={() => {
		state = 'paused';
	}}
	on:won={() => {
		state = 'won';
	}}
	on:lost={() => {
		state = 'lost';
	}}
/>
{#if state !== 'playing'}
	<Modul>
		<header>
			<h1>e<span>match</span>i</h1>
			<p>the emoji matching game</p>
		</header>
		{#if state === 'waiting'}
			<p>choose a level</p>
		{:else if state === 'won' || state === 'lost'}
			<p>you {state}! play again?</p>
		{:else if state === 'paused'}
			<p>game is paused</p>
		{/if}
		<div class="buttons">
			{#if state === 'paused'}
				<button
					on:click={() => {
						game.resume();
						state = 'playing';
					}}>resum</button
				>
				<button
					on:click={() => {
						game.quit();
						state = 'waiting';
					}}>quit</button
				>
			{:else}
				{#each levels as level}
					<button
						on:click={() => {
							game.start(level);
						}}>{level.label}</button
					>
				{/each}
			{/if}
		</div>
	</Modul>
{/if}

{#if state === 'won'}
	<div
		class="confetti"
		use:confetti={{
			stageWidth: innerWidth,
			stageHeight: innerHeight
		}}
	/>
{/if}

<style>
	h1 {
		font-size: 8em;
		color: white;
		text-align: center;
		margin: 0;
	}
	h1 span {
		color: hsl(275, 1040%, 57%);
	}
	p {
		text-align: center;
		color: white;
		font-family: Grandstander;
		margin: 0;
	}
	.confetti {
		position: fixed;
		top: 30%;
		left: 50%;
		width: 100%;
		height: 100%;
		pointer-events: none;
		z-index: 1000;
	}
	.buttons {
		display: flex;
		justify-content: space-between;
		align-items: center;
		gap: 1em;
	}
	.buttons button {
		padding: 0.5em 1em;
		border-radius: 0.5em;
		border: none;
		background-color: hsl(275, 1040%, 57%);
		color: white;
		font-family: Grandstander;
		font-size: 1.5em;
		cursor: pointer;
	}
	header p {
		font-size: 2em;
	}
</style>
