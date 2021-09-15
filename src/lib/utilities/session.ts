import type { Session } from '@supabase/supabase-js';

export async function setServerSession(event: string, session: Session): Promise<void> {
	await fetch('/api/auth.json', {
		method: 'POST',
		headers: new Headers({ 'Content-Type': 'application/json' }),
		credentials: 'same-origin',
		body: JSON.stringify({ event, session })
	});
}

export const setAuthCookie = async (session: Session): Promise<void> =>
	await setServerSession('SIGNED_IN', session);
export const unsetAuthCookie = async (): Promise<void> =>
	await setServerSession('SIGNED_OUT', null);
