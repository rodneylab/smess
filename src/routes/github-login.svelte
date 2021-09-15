<script context="module" lang="ts">
	import type { Load } from '@sveltejs/kit';

	export const load: Load = async ({ page, fetch }) => {
		type GithubLoginParams = URLSearchParams & {
			provider_token: string;
			refresh_token: String;
		};
		const { hash } = page.params;
		const hashValues = new URLSearchParams(hash) as GithubLoginParams;
		const { provider_token: providerToken, refresh_token: refreshToken } = hashValues;

		// user might have manually navigated to this page
		if (!providerToken && !refreshToken) {
			return {
				status: 301,
				redirect: '/messages/'
			};
		}

		const loginResponse = await fetch('/api/login.json', {
			method: 'POST',
			credentials: 'same-origin',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				providerToken,
				refreshToken
			})
		});

		const { errors } = await loginResponse.json();

		if (errors) {
			return {};
		}

		return {
			status: 301,
			redirect: '/messages/'
		};
	};
</script>

<h1>There's bad news and good news...</h1>

<p>
	Bad news is login did not work. the good news is you can <a
		aria-label="Attempt to login in again"
		href="/login/">try again</a
	>.
</p>
