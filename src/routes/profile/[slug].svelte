<script lang="ts" context="module">
	import type { UserProfileModel } from '$lib/models/user/UserProfileModel';



	export async function load({ page }) {
		let slug = page.params.slug;

		try {
			var res = await UserRepository.profile(slug);
			return {
				status: 200,
				props: {
					user: res
				}
			};
		} catch (err) {
			console.log(err);

			return {
				status: 500
			};
		}
	}
</script>

<script lang="ts">
	import SendPrivateMessage from '$lib/components/SendPrivateMessage.svelte';
	import { signedInUser } from '$lib/stores/UserStore';
	import { UserRepository } from '$lib/utils/repositories/UserRepository';
	import { onMount } from 'svelte';
	import { supabase } from '$lib/utils/db';
	let mounted = false;

	export let user: UserProfileModel;

	onMount(() => {

		mounted = true;
	});
</script>

<h1>Profile of {user.username}</h1>


	<SendPrivateMessage sender={$signedInUser.username} recipient={user.username} />
