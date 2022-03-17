<script lang="ts" context="module">
	import { UserRepository } from '$lib/utils/repositories/UserRepository';

	export async function load({ page }) {
		let user = page.params.user;
		console.dir(user);

		try {
			var res = await UserRepository.profile(user);
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
	import type { UserProfileModel } from '$lib/models/user/UserProfileModel';
	import { isNullOrEmpty } from '$lib/validation/strings';
	import { signedInUser } from '$lib/stores/UserStore';
	import SendPrivateMessage from '$lib/components/SendPrivateMessage.svelte';

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
			<p>
				You have not yet written a profile. <a
					href="/profile/@{user.username}/edit"
					class="nav-link">Click here to edit profile.</a
				>
			</p>
		{/if}
		<div class="card-actions">
			{#if $signedInUser && $signedInUser.username != user.username}
				<button on:click={() => (showMessageModal = !showMessageModal)} class="btn btn-primary"
					>Send message</button
				>
			{:else if !isNullOrEmpty(user.description)}
				<a href="/profile/@{user.username}/edit" class="nav-link">Edit profile</a>
			{/if}
		</div>
	</div>
</div>

{#if showMessageModal}
	<div class="card shadow" style="margin: 0; padding: 0">
		<div class="card-body">
			<SendPrivateMessage
				sender={$signedInUser.username}
				recipient={user.username}
				on:success={onMessageSent}
			/>
		</div>
	</div>
{/if}
