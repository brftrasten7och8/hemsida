/* eslint-disable @typescript-eslint/no-explicit-any */
import { client } from '$lib/contentfulClient';
import { secret } from '$lib/secret';
import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

// import { dev } from '$app/environment';
const dev = false;

export const prerender = true;

export const GET = (async () => {
	try {
		let result;
		if (dev) {
			console.log('hardcoded load');
			const { hardcoded } = await import('$lib/hardcoded');
			result = hardcoded;
		} else {
			console.log('contentful load');
			const getStartPage = client.getEntries<any>({
				content_type: 'page',
				'fields.slug': '/',
				include: 5
			});
			const getFooter = client.getEntries({
				content_type: 'text',
				'fields.title': 'Sidfot'
			});
			const content = await Promise.all([getStartPage, getFooter]);

			const startpage = content[0]?.items?.[0];
			const footer = content[1]?.items?.[0];

			// remove secret and content (from medlemssidor), content will be fetched client side if logged in.
			startpage?.fields.subpages?.forEach((item: App.Entry) => {
				if (item?.fields?.secret === secret) {
					delete item?.fields?.content;
					delete item?.fields?.secret;
				}
			});

			result = {
				startpage,
				footer
			};
		}

		return json(result);
	} catch (e) {
		throw error(400, 'Something went wrong');
	}
}) satisfies RequestHandler;
