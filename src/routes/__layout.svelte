<script lang="ts">
	import { session } from '$app/stores';
	import { supabase } from '$lib/supabaseClient';
	import { setAuthCookie, unsetAuthCookie } from '$lib/utilities/session';
	import Footer from '$lib/components/Layout/Footer.svelte';

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
<Footer />
