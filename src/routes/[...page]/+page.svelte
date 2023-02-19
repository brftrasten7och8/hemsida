<script lang="ts">
	import type { PageServerData } from './$types';

	import Page from '$lib/components/Page.svelte';
	import { pages } from '$lib/store';

	export let data: PageServerData;

	let findSubpage: App.Entry | undefined;
	let findPage: App.Entry | undefined;
	let title = '';
	$: findPage = $pages?.fields?.subpages?.find((p) => p.fields?.slug === data.page);

	$: if (findPage && data.subpage) {
		findSubpage = findPage.fields?.subpages?.find((p) => p.fields?.slug === data.subpage);
	} else {
		findSubpage = undefined;
	}
</script>

{#if findSubpage || findPage}
	<Page page={findSubpage || findPage} />
{:else}
	<article>
		<h1>404</h1>
		<p>Sidan kunde ej hittas. 🤷‍♂️</p>
		<p><a href="/">Gå till startsidan</a></p>
	</article>
{/if}
