<script lang="ts" context="module">
	import type { UserProfileModel } from '$lib/models/user/UserProfileModel';
	import { profile } from '$lib/stores/UserStore';

	export async function load({ page }) {

		let slug = page.params.slug;

		try {
			var res = await profile(slug);
		} catch (err) {
			console.log(err);
		}

		return {
			status: 200,
			props: {
				user: res.data
			}
		};
	}
</script>

<script lang="ts">
	export let user: UserProfileModel;
	import { signedInUser } from '$lib/stores/UserStore';
	import { onMount } from 'svelte';
	let hasMounted = false

	onMount(() => {
		hasMounted = true;
	});
</script>

	<h1>Profile of {user.username}</h1>

	{#if hasMounted && user.username != $signedInUser.username}
		
		Not you
	{/if}
