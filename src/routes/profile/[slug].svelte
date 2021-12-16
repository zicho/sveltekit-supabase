<script lang="ts" context="module">
	import type { UserProfileModel } from '$lib/models/user/UserProfileModel';
	import { profile } from '$lib/stores/UserStore';
	let user: UserProfileModel;

	export async function load({ page, fetch }) {
		let slug = page.params.slug;

		try {
			console.log('ON LOAD TRIGGERED');
			var res = await profile();

			console.dir(res.data);
			user = res.data;
		} catch (err) {
			console.log(err);
		}

		return {
			status: 200,
			props: {
				user: user
			}
		};
	}
</script>

<script lang="ts">
	export let user: UserProfileModel;
</script>

<h1>Profilio</h1>
<h1>Profile of {user.username}</h1>

<!-- <button on:click={load}>Clicketyclick</button> -->
