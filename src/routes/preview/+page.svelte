<script lang="ts">
	import Page from '$lib/components/Page.svelte';
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';

	let page: App.Entry | undefined;
	let hasLoadedPage = false;

	onMount(() => {
		const slug = new URLSearchParams(window.location.search).get('page');
		if (slug) {
			fetchPreview(slug);
		} else {
			hasLoadedPage = true;
		}
	});

	async function fetchPreview(slug: string) {
		if (!browser) return;
		const data = await fetch(`${window.location.origin}/api/preview.json`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded'
			},
			body: `slug=${slug}`
		});
		const result = await data.json();

		if (result && Object.keys(result).length) {
			page = result;
		}

		hasLoadedPage = true;
	}
</script>

{#if page}
	<article class="preview-banner">
		<b>Förhandsvisning</b>
		<p>Den här sidan är en förhandsvisning, den är inte publicerad på hemsidan</p>
	</article>
	<Page {page} />
{:else if hasLoadedPage}
	<article>
		<h1>Förhandsvisning</h1>
		<p>Sidan kunde ej hittas. 🤷‍♂️</p>
		<p><a href="/">Gå till startsidan</a></p>
	</article>
{/if}

<style>
	.preview-banner {
		background-color: aqua;
		padding-top: 1rem;
		padding-bottom: 0.5rem;
	}

	@media (max-width: 960px) {
		.preview-banner {
			padding-top: 64px;
		}
	}
</style>
