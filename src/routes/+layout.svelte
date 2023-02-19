<script lang="ts">
	import { browser } from '$app/environment';
	import '$lib/styles/app.css';
	import MenuButton from '$lib/components/MenuButton.svelte';
	import Navigation from '$lib/components/Navigation.svelte';
	import Footer from '$lib/components/Footer.svelte';

	import { pages, footer, navOpen, isSmall } from '$lib/store';

	import { getIsSmall } from '$lib/utils/getIsSmall';

	import type { LayoutData } from './$types';

	export let data: LayoutData;

	if (data.startpage) {
		$pages = data.startpage;
	}
	if (data.footer) {
		$footer = data.footer;
	}

	function handleResize() {
		const current = getIsSmall();
		if (current !== $isSmall) $isSmall = current;
	}

	$: if (browser) {
		if ($isSmall && $navOpen) {
			document.body.classList.add('noscroll');
		} else {
			document.body.classList.remove('noscroll');
		}
	}
</script>

<svelte:window on:resize|passive={handleResize} />

<svelte:head>
	<title>Brf Trasten 7 & 8</title>
	<meta name="description" content="Hemsida för bostadsrättsföreningen Brf Trasten 7 & 8" />
</svelte:head>

<div class="site-wrapper" class:navOpen={$navOpen}>
	<MenuButton />
	<Navigation />
	<main>
		<slot />
	</main>
	<div class="footer-wrapper">
		<Footer />
	</div>
</div>

<style>
	main {
		min-height: 100vh;
	}
	main,
	.footer-wrapper {
		padding-left: 300px;
	}

	.footer-wrapper {
		background-color: var(--color-background-secondary);
	}

	@media (max-width: 960px) {
		main,
		.footer-wrapper {
			padding-left: 0;
		}
	}
</style>
