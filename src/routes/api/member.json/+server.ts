/* eslint-disable @typescript-eslint/no-explicit-any */
import { client } from '$lib/contentfulClient';
import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const POST = (async (event) => {
	const body = await event.request.formData();
	const secret = body.get('secret');
	try {
		const getMemberPages = await client.getEntries<any>({
			content_type: 'page',
			'fields.secret': secret
		});

		const memberPages = getMemberPages?.items?.[0] ?? {};

		delete memberPages?.fields?.secret;

		return json(memberPages);
	} catch (e) {
		throw error(400, 'Something went wrong');
	}
}) satisfies RequestHandler;
