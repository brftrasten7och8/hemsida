import { BRF_TRASTEN_PASSWORD } from '$env/static/private';

export let secret = 'noop';

if (process.env.VERCEL === '1') {
	secret = process?.env?.BRF_TRASTEN_PASSWORD ?? 'noop';
} else {
	secret = BRF_TRASTEN_PASSWORD ?? 'noop';
}
