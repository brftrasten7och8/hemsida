<script lang="ts">
	import { footer } from '$lib/store';
	import { BLOCKS } from '@contentful/rich-text-types';
	import { documentToHtmlString, type Options } from '@contentful/rich-text-html-renderer';
	const date = new Date();
	const currentYear = date.getFullYear();

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

<div class="footer">
	{#if $footer.fields?.text}
		{@html documentToHtmlString($footer.fields.text, options).replace(/\n/g, `<br />`)}
	{:else}
		<div class="footer-info">
			<div class="footer-info-item">
				<h3>Brf Trasten 7 och 8</h3>
				Surbrunnsgatan 9-11<br />
				114 27 Stockholm
			</div>
			<div class="footer-info-item">
				<h3>E-post</h3>
				brftrasten7och8@gmail.com
			</div>

			<div class="footer-info-item">
				<h3>Organisationsnummer</h3>
				769607-4371
			</div>
		</div>

		<div class="footer-bottom">© {currentYear} Brf Trasten 7 och 8</div>
	{/if}
</div>

<style>
	.footer {
		border-top: 1px solid var(--color-border);

		max-width: 960px;
		padding: var(--padding) var(--padding-small);
		overflow-x: auto;
	}

	:global(.footer p) {
		margin-top: 0.5rem;
		margin-bottom: var(--padding-small);
	}

	:global(.footer p:last-child) {
		margin-bottom: 0;
	}

	@media (max-width: 960px) {
		.footer {
			padding: var(--padding-small);
		}
	}
</style>
