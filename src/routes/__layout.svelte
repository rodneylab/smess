<script>
	import { session } from '$app/stores';
	import { supabase } from '$lib/supabaseClient';
	import { setAuthCookie, unsetAuthCookie } from '$lib/utilities/session';

	supabase.auth.onAuthStateChange(async (event, supabaseSession) => {
		if (event !== 'SIGNED_OUT') {
			session.set({ user: supabaseSession.user });
			await setAuthCookie(supabaseSession);
		} else {
			session.set({ user: { guest: true } });
			await unsetAuthCookie();
		}
	});
</script>

<main><slot /></main>