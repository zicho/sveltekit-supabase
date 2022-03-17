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
					user: res.data
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
	import { isNullOrEmpty } from '$lib/validation/strings';
	import { goto } from '$app/navigation';

	export let user: UserProfileModel;
	let showMessageModal: boolean = false;

	function onMessageSent() {
		showMessageModal = false;
	}
</script>

<div class="card lg:card-side card-bordered">
	<div class="card-body">
		<h2 class="card-title">Profile of {user.username}</h2>
		{#if !isNullOrEmpty(user.description)}
			<p>{user.description}</p>
		{:else if $signedInUser && $signedInUser.username != user.username}
			<p>This user has not yet written a profile.</p>
		{:else}
			<p>You have not yet written a profile.</p>
		{/if}
		<div class="card-actions">
			{#if $signedInUser && $signedInUser.username != user.username}
				<button on:click={() => (showMessageModal = !showMessageModal)} class="btn btn-primary"
					>Send message</button
				>
			{:else}
				<button on:click={() => goto('/edit')} class="btn btn-primary"
					>Edit profile</button
				>
			{/if}
		</div>
	</div>
</div>
{#if showMessageModal}
	<div class="card shadow" style="margin_ 0; padding: 0">
		<div class="card-body">
			<SendPrivateMessage
				sender={$signedInUser.username}
				recipient={user.username}
				on:success={onMessageSent}
			/>
		</div>
	</div>
{/if}
