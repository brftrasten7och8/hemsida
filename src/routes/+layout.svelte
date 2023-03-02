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

	let pageScrolled = false;
	let y = 0;

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

	let page = '';
	let subPage = '';

	$: if (browser) {
		if ($isSmall && $navOpen) {
			document.body.classList.add('noscroll');
		} else {
			document.body.classList.remove('noscroll');
		}

		if (window.location.pathname === '/') {
			page = '/';
			subPage = '';
		} else {
			const params = window.location.pathname.split('/');
			page = params[1] ?? '';
			subPage = params[2] ?? '';
		}
	}

	$: if (y > 96) {
		pageScrolled = true;
	} else {
		pageScrolled = false;
	}
	$: if (browser) document.body.classList.toggle('pageScrolled', pageScrolled);

	let findSubpage: App.Entry | undefined;
	let findPage: App.Entry | undefined;
	let title: string = '';
	$: findPage = $pages?.fields?.subpages?.find((p) => p.fields?.slug === page);

	$: if (findPage && subPage) {
		findSubpage = findPage.fields?.subpages?.find((p) => p.fields?.slug === subPage);
	} else {
		findSubpage = undefined;
	}

	$: if (findSubpage) {
		title = findSubpage?.fields?.title ?? '';
	} else if (findPage) {
		title = findPage?.fields?.title ?? '';
	} else {
		title = 'Start';
	}
</script>

<svelte:window on:resize|passive={handleResize} bind:scrollY={y} />

<svelte:head>
	<title>Brf Trasten 7 & 8 - {title}</title>
	<meta name="description" content="Hemsida för bostadsrättsföreningen Brf Trasten 7 & 8" />
	<meta name="format-detection" content="telephone=no" />
</svelte:head>

<div class="site-wrapper" class:navOpen={$navOpen}>
	<MenuButton {title} />

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
