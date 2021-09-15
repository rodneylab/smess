<script lang="ts">
	import website from '$lib/configuration/website';
	import { VERTICAL_LINE_ENTITY } from '$lib/constants/entities';
	export let metadescription = '';
	export let title;

	const { siteLanguage, siteTitle } = website;
	const pageTitle = `${siteTitle} ${VERTICAL_LINE_ENTITY} ${title}`;
</script>

<svelte:head>
	<html lang={siteLanguage} />
	<title>{pageTitle}</title>
	<meta name="description" content={metadescription} />
</svelte:head>
