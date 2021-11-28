<script lang="ts">
	import { register } from '$lib/services/UserService';
	import { RegisterUserModel } from '$lib/models/user/RegisterUserModel';
	import { createEventDispatcher } from 'svelte';
	// import { post } from '$lib/utils/EndpointClient';

	let loading: boolean = false;
	let user: RegisterUserModel = new RegisterUserModel();
	let error: string;
	let dispatch = createEventDispatcher();

	async function onRegisterClick() {
		loading = true;

		if (!user.validate().success) {
			error = user.validate().message;
			loading = false;
			return;
		}

		const res = await register(user);

		if (res.success) {
			dispatch('success');
		} else {
			error = res.message;
		}
		loading = false;
	}
</script>

<h1>Register</h1>
<input type="email" required bind:value={user.email} />
<input type="password" required bind:value={user.password} />
<input type="password" required bind:value={user.confirmPassword} />
{#if error != undefined}<p>{error}</p>{/if}
<button disabled={loading} on:click={onRegisterClick}>Register</button>
