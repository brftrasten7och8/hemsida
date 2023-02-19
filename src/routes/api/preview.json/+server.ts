/* eslint-disable @typescript-eslint/no-explicit-any */
import { previewClient } from '$lib/contentfulClient';
import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const POST = (async (event) => {
	const body = await event.request.formData();
	const slug = body.get('slug');

	if (slug === 'medlemssidor') return json({});

	try {
		const result = await previewClient.getEntries<any>({
			content_type: 'page',
			'fields.slug': slug
		});

		const page = result?.items?.[0] ?? {};

		return json(page);
	} catch (e) {
		throw error(400, 'Something went wrong');
	}
}) satisfies RequestHandler;
