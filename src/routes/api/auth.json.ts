import type { User } from '@supabase/supabase-js';
import type { Request } from '@sveltejs/kit';

export async function post(): Promise<{ status: number; body: Record<string, never> }> {
	return { status: 200, body: null };
}

export async function get(req: Request): Promise<{ body: { user: User } }> {
	const { user } = await req.locals;
	return {
		body: {
			user
		}
	};
}
