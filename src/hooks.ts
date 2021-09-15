import { supabase } from '$lib/supabaseClient';
import {
	toExpressRequest,
	toExpressResponse,
	toSvelteKitResponse
} from '$lib/utilities/expressify';
import type { Handle, GetSession } from '@sveltejs/kit';

export const handle: Handle = async ({ request, resolve }) => {
	const expressStyleRequest = toExpressRequest(request);
	const { user } = await supabase.auth.api.getUserByCookie(expressStyleRequest);

	request.locals.token = expressStyleRequest.cookies['sb:token'] || undefined;
	request.locals.user = user || { guest: true };

	if (request.locals.token) {
		supabase.auth.setAuth(request.locals.token);
	}

	if (request.query.has('_method')) {
		request.method = request.query.get('_method').toUpperCase();
	}

	let response = await resolve(request);

	if (request.method === 'POST' && request.path === '/api/auth.json') {
		supabase.auth.api.setAuthCookie(request, toExpressResponse(response));
		response = toSvelteKitResponse(response);
	}

	return response;
};

export const getSession: GetSession = async (request) => {
	const { user, token } = request.locals;
	return { user, token };
};
