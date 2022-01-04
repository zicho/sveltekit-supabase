<script lang="ts" context="module">
	import type { UserProfileModel } from '$lib/models/user/UserProfileModel';
	import { UserRepository } from '$lib/utils/repositories/UserRepository';

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
	import { browser } from '$app/env';

	export let user: UserProfileModel;
	let showMessageModal: boolean = false;

	const click = () => {
		alert($signedInUser.username)
	}
</script>

<h1>Profile of {user.username}</h1>

<!-- {#if browser}
	
{/if} -->


<button on:click="{() => showMessageModal = !showMessageModal}" class="btn btn-primary">Send message</button> 
{#if showMessageModal}

    <SendPrivateMessage sender={$signedInUser.username} recipient={user.username} />

{/if}