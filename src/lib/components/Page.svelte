<script lang="ts">
	import { BLOCKS } from '@contentful/rich-text-types';
	import { documentToHtmlString, type Options } from '@contentful/rich-text-html-renderer';

	export let page: App.Entry | undefined;

	const options = {
		renderNode: {
			[BLOCKS.EMBEDDED_ASSET]: (node) => {
				const { file, description } = node.data.target.fields;
				if (file.contentType.includes('image')) {
					const { width, height } = file.details.image;
					return `<img src="${file.url}" alt="${
						description || ''
					}" width="${width}" height="${width}" loading="lazy" />`;
				}
			}
		}
	} as Partial<Options>;
</script>

<article>
	{#if page?.fields}
		<div class="height-controller">
			<h1>{@html page.fields.title}</h1>

			{#if page.fields.image}
				<img
					src={page.fields.image.fields.file.url}
					width={page.fields.image.fields.file.details.image.width}
					height={page.fields.image.fields.file.details.image.height}
					alt={page.fields.image.fields.description}
				/>
			{/if}
			{#if page.fields.content}
				<div class="page-content">
					{@html documentToHtmlString(page.fields.content, options).replace(/\n/g, `<br />`)}
				</div>
			{/if}
		</div>
	{/if}
</article>
