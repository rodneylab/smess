<script context="module" lang="ts">
	import type { Load } from '@sveltejs/kit';

	export const load: Load = async ({ page, fetch }) => {
		const authResponse = await fetch('/api/auth.json');
		const user = { ...(await authResponse.json()) };
		if (user.user.guest) {
			return {};
		}

		return {
			status: 301,
			redirect: '/messages/'
		};
	};
</script>

<script lang="ts">
	import GithubLogin from '$lib/components/GithubLogin.svelte';
	import SEO from '$lib/components/SEO/index.svelte';

	$: isSubmitting = false;
</script>

<SEO
	title="Login"
	metadescription="Log in to smess to view your messages.  Alternatively set up a new account."
/>
<h1>Login</h1>
<GithubLogin />
<form>
	<p>Have a password? Continue with your email address.</p>
	<input name="username" placeholder="username" label="Username" required />
	<input name="password" placeholder="password" label="Password" required />
	<button type="submit" disabled={isSubmitting}>Login with email</button>
</form>
