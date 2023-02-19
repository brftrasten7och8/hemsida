<script lang="ts">
	import Page from '$lib/components/Page.svelte';
	import { pages } from '$lib/store';
</script>

{#if $pages}
	<Page page={$pages} />
{/if}
