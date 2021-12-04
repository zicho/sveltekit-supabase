<script lang="ts">
	import { login } from '$lib/services/UserService';
	import { createEventDispatcher } from 'svelte';
	import { LoginUserModel } from '$lib/models/user/LoginUserModel';
	import { session } from '$app/stores';
	// import { post } from '$lib/utils/EndpointClient';

	let loading: boolean = false;
	let user: LoginUserModel = new LoginUserModel();
	let error: string;
	let dispatch = createEventDispatcher();

	async function onLoginClick() {
		loading = true;

		// if (!user.validate().success) {
		// 	error = user.validate().message;
		// 	loading = false;
		// 	return;
		// }

		const res = await login(user);

		if (res.success) {
			$session = res.data;
			dispatch('success');
		} else {
			error = res.message;
		}
		loading = false;
	}
</script>

<h1>Login</h1>
<input type="email" required bind:value={user.email} />
<input type="password" required bind:value={user.password} />

{#if error != undefined}<p>{error}</p>{/if}
<button disabled={loading} on:click={onLoginClick}>Login</button>
