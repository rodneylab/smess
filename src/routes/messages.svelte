<script context="module" lang="ts">
	import type { Load } from '@sveltejs/kit';

	export const load: Load = async ({ page, fetch }) => {
		const authResponse = await fetch('/api/auth.json');
		const user = { ...(await authResponse.json()) };
		if (!user.user.guest) {
			return {
				props: { user }
			};
		}

		return {
			status: 301,
			redirect: '/login/'
		};
	};
</script>

<script>
	import Header from '$lib/components/Layout/Header.svelte';
	import SEO from '$lib/components/SEO/index.svelte';
	export let user;
</script>

<SEO title="Message" metadescription="View your messages." />
<Header {user} />
<h1>Messages</h1>
