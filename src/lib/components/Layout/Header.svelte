<script lang="ts">
	export let user = { guest: true };

	$: isGuest = user.guest ?? true;

	function handleLogout() {
		console.log('Someone clicked log out');
	}
</script>

<header>
	<div><a aria-label="Go to smess home" href="/">smess</a></div>
	{#if isGuest}
		<a aria-label="Log in" href="/login/">Login</a>
		<a aria-label="Register" href="/register/">Register</a>
	{:else}
		<a aria-label="See messages" href="/messages/">messages</a>
		<div>username</div>
		<button type="button" on:click={handleLogout}>Logout</button>
	{/if}
</header>
