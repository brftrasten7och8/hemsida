import { error } from '@sveltejs/kit';

import type { LayoutServerLoad } from './$types';

export const load = (async ({ url }) => {
	try {
		// console.log('fetched api');
		const data = await fetch(`${url.origin}/api/pages.json`);
		const result = await data.json();

		return {
			startpage: result.startpage as App.Entry | undefined,
			footer: result.footer as App.Entry | undefined
		};
	} catch (e) {
		throw error(404, 'Not found.');
	}
}) satisfies LayoutServerLoad;
