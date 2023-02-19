/* eslint-disable @typescript-eslint/no-explicit-any */
export function debounce(fn: any, waitMilliseconds = 300) {
	let timeoutId: number | null = null;
	return (...args: any) => {
		if (timeoutId) clearTimeout(timeoutId);
		timeoutId = setTimeout(() => fn(...args), waitMilliseconds) as unknown as number;
	};
}
