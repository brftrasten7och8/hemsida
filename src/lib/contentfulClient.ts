import contentful from 'contentful';
import {
	CONTENTFUL_SPACE_ID,
	CONTENTFUL_DELIVERY_API_TOKEN,
	CONTENTFUL_PREVIEW_API_TOKEN
} from '$env/static/private';

let space, accessToken, previewToken;

if (process.env.VERCEL === '1') {
	space = process.env.CONTENTFUL_SPACE_ID ?? '';
	accessToken = process.env.CONTENTFUL_DELIVERY_API_TOKEN ?? '';
	previewToken = process.env.CONTENTFUL_PREVIEW_API_TOKEN ?? '';
} else {
	space = CONTENTFUL_SPACE_ID;
	accessToken = CONTENTFUL_DELIVERY_API_TOKEN;
	previewToken = CONTENTFUL_PREVIEW_API_TOKEN;
}

export const client = contentful.createClient({
	space,
	accessToken
});

export const previewClient = contentful.createClient({
	space,
	accessToken: previewToken,
	host: 'preview.contentful.com'
});
