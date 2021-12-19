<script lang="ts" context="module">
	import type { UserProfileModel } from '$lib/models/user/UserProfileModel';
	import type { ServiceResponse } from '$lib/models/ServiceResponse';
	export async function load({ page }) {
		let slug = page.params.slug;

		try {
			var res = await fetch('/api/user/' + slug);
			var data = await res.json() as ServiceResponse<UserProfileModel>;

			return {
				status: 200,
				props: {
					user: data.data
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

	export let user: UserProfileModel;
</script>

<h1>Profile of {user.username}</h1>

<SendPrivateMessage sender={$signedInUser.username} recipient={user.username} />
