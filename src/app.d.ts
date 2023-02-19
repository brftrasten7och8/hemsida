/* eslint-disable @typescript-eslint/no-explicit-any */

// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
// and what to do when importing types
declare namespace App {
	import type { Entry } from 'contentful';
	// interface Error {}
	// interface Locals {}
	// interface PageData {}
	// interface Platform {}

	interface Entry extends Entry<any> {
		fields?: {
			slug?: string;
			title: string;
			secret?: string;
			content: any;
			text?: any;
			image?: {
				fields: {
					description: string;
					title: string;
					file: {
						fileName: string;
						url: string;
						contentType: string;
						details: {
							size: number;
							image: {
								height: number;
								width: number;
							};
						};
					};
				};
			};
			subpages?: App.Entry[];
		};
		metadata: Entry.Metadata;
		sys: Entry.Sys;
	}
}
