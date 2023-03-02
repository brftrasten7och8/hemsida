<script lang="ts">
	import { navOpen } from '$lib/store';
	import Close from '$lib/icons/Close.svelte';
	import Menu from '$lib/icons/Menu.svelte';

	export let title = '';

	function handleMenuButtonClick() {
		$navOpen = !$navOpen;
	}
</script>

<div class="nav-bar" class:navOpen={$navOpen}>
	<button
		class="menu-button"
		on:click={handleMenuButtonClick}
		aria-label={$navOpen ? 'Stäng meny' : 'Öppna meny'}
	>
		{#if $navOpen}
			<Close />
		{:else}
			<Menu />
		{/if}
	</button>
	<img
		src="/images/brftrastentext.jpg"
		draggable="false"
		class="menu-logo"
		alt="Brf trasten 7 & 8"
	/>
	<div class="nav-bar-title">{@html title}</div>
</div>

<style>
	.nav-bar {
		display: none;
	}
	@media (max-width: 960px) {
		.nav-bar {
			background: rgba(255, 255, 255, 0.7);
			backdrop-filter: blur(8px);
			width: 100%;
			overflow: hidden;
			display: block;
			position: absolute;
			z-index: 2;
			padding: 24px 0;
			padding-left: calc(var(--padding-small) - (1rem + 3px));
			height: 40px;

			display: flex;
			justify-content: left;
			align-items: center;
		}

		:global(.pageScrolled) .nav-bar {
			position: fixed;
			box-shadow: var(--shadow-down);
			animation: slideDown var(--animation-time);
		}
		.nav-bar.navOpen {
			width: auto;
			background: white;
			box-shadow: none;
			pointer-events: none;
		}
		.menu-button {
			pointer-events: auto;
			display: flex;
			justify-content: left;
			align-items: center;

			border: 0;
			background-color: transparent;
			color: var(--color-text);
		}

		.menu-logo {
			width: 100%;
			max-width: 120px;
		}

		:global(.pageScrolled) .menu-logo {
			display: none;
		}

		.navOpen .menu-logo {
			display: block;
		}

		.nav-bar-title {
			display: none;
		}

		:global(.pageScrolled) .nav-bar-title {
			display: block;
			display: -webkit-box;
			font-weight: bold;
			line-height: 1.2;
			-webkit-line-clamp: 2;
			-webkit-box-orient: vertical;
			overflow: hidden;
			text-overflow: ellipsis;
		}

		.navOpen .nav-bar-title {
			display: none;
		}
	}

	@keyframes slideDown {
		from {
			transform: translateY(-100%);
		}
		to {
			transform: translateY(0);
		}
	}
</style>
