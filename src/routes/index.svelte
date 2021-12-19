<script lang="ts" context="module">
	import { getAll } from '$lib/stores/UserStore';
    import { users } from '$lib/utils/db';
	export async function load({ page }) {
		try {
			var res = await users.getAll();
            console.log(res)
		} catch (err) {
			console.log(err);
		}

		return {
			status: 200,
			props: {
				users: res
			}
		};
	}
</script>

<script lang="ts">
	import type { UserProfileModel } from '$lib/models/user/UserProfileModel';

import { onMount } from 'svelte';


	export let users: UserProfileModel[];
    let mounted = false;

    onMount(() => mounted = true)
</script>

<h1>You are logged in.</h1>

{#if mounted && users.length > 0}
<ul>
	{#each users as u}
		<li>
			<a href="profile/{u.username}">{u.username}</a>
		</li>
	{/each}
</ul>

{/if}