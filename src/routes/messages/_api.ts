import type { Request } from '@sveltejs/kit';
import type { Locals } from '$lib/types';
import { Message, PrismaClient } from '.prisma/client';

const prisma = new PrismaClient();

/*
	This module is used by the /todos.json and /todos/[uid].json
	endpoints to make calls to api.svelte.dev, which stores todos
	for each user. The leading underscore indicates that this is
	a private module, _not_ an endpoint — visiting /todos/_api
	will net you a 404 response.

	(The data on the todo app will expire periodically; no
	guarantees are made. Don't use it to organise your life.)
*/

export async function api(
	request: Request<Locals>,
	resource: string,
	data?: Message
): Promise<{
	body?: Message | Record<string, never>;
	status: number;
	headers?: { location?: string };
}> {
	// user must have a cookie set
	if (!request.locals.userid) {
		return { status: 401 };
	}

	let body = {};
	let status = 500;
	switch (request.method.toUpperCase()) {
		case 'DELETE':
			await prisma.message.delete({
				where: {
					uid: resource.split('/').pop()
				}
			});
			status = 200;
			break;
		case 'GET':
			body = await prisma.message.findMany();
			status = 200;
			break;
		case 'PATCH':
			body = await prisma.message.update({
				data: {
					status: data.status
				},
				where: {
					uid: resource.split('/').pop()
				}
			});
			status = 200;
			break;
		// case 'POST':
		// 	body = await prisma.message.create({
		// 		data: {
		// 			createdAt: new Date()
		// 		}
		// 	});
		// 	status = 201;
		// 	break;
	}

	// if the request came from a <form> submission, the browser's default
	// behaviour is to show the URL corresponding to the form's "action"
	// attribute. in those cases, we want to redirect them back to the
	// /todos page, rather than showing the response
	if (request.method !== 'GET' && request.headers.accept !== 'application/json') {
		return {
			status: 303,
			headers: {
				location: '/todos'
			}
		};
	}

	return {
		status,
		body
	};
}
