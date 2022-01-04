<script lang="ts" context="module">
	import type { UserProfileModel } from '$lib/models/user/UserProfileModel';
	import type { ServiceResponse } from '$lib/models/ServiceResponse';

	export async function load({ fetch }) {
		try {
			var res = await fetch('api/user/getAll');
			var data = (await res.json()) as ServiceResponse<UserProfileModel[]>;

			return {
				status: 200,
				props: {
					users: data.data
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
	export let users: UserProfileModel[];
</script>

<h1 class="margin-bottom-l">You are logged in.</h1>

<ul>
	{#each users as u}
		<li>
			<a href="profile/{u.username}">{u.username}</a>
		</li>
	{/each}
</ul> 
