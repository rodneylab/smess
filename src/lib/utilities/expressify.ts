import { parse } from 'cookie';
import type { Response, Request } from '@sveltejs/kit';
import type { ResponseHeaders } from '@sveltejs/kit/types/helper';
import type { StrictBody } from '@sveltejs/kit/types/hooks';

export function toExpressRequest(
	req: Request
): Request & {
	cookies: Record<string, string>;
} {
	return {
		...req,
		cookies: parse(req.headers.cookie || '')
	};
}

export function toExpressResponse(res: Response): Record<string, unknown> {
	return {
		...res,
		getHeader: (header) => res.headers[header.toLowerCase()],
		setHeader: (header, value) => (res.headers[header.toLowerCase()] = value),
		status: () => ({ json: {} })
	};
}

export function toSvelteKitResponse(
	response: Response
): { status: number; headers: ResponseHeaders; body?: StrictBody } {
	const { status, headers, body } = response;
	return { status, headers, body };
}
