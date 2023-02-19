import { writable } from 'svelte/store';
import { getIsSmall } from '$lib/utils/getIsSmall';

export const pages = writable({} as App.Entry);
export const footer = writable({} as App.Entry);
export const navOpen = writable(false);
export const isSmall = writable(getIsSmall());
