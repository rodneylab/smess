<script lang="ts">
	import { supabase } from '$lib/supabaseClient';

	async function handleClick() {
		await supabase.auth.signIn({ provider: 'github' }, { redirectTo: '/github-login/' });
	}
</script>

<button type="submit" on:click={handleClick}>Continue with GitHub</button>
