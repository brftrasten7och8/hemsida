import type { PageServerLoad } from './$types';

export const load = (async ({ params }) => {
	const [page, subpage] = params.page.split('/');
	return {
		page,
		subpage
	};
}) satisfies PageServerLoad;
