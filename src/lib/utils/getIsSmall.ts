import { browser } from '$app/environment';

export function getIsSmall() {
	if (!browser) return false;
	const breakpoint = 960;
	return window.innerWidth <= breakpoint;
}
