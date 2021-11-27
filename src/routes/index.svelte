<script lang="ts">
	import { register } from '$lib/services/UserService';
	import { RegisterUserModel } from '$lib/models/user/RegisterUserModel';
	// import { post } from '$lib/utils/EndpointClient';

	let loading: boolean = false;
	let user: RegisterUserModel = new RegisterUserModel();
	let error: string;

	async function onRegisterClick() {
	
		const res = await register(user);

		if (res.success) {
			// login or something
		} else {
			error = res.message;
		}
	}
</script>

<h1>Register</h1>
<input type="email" bind:value={user.email} />
<input type="password" bind:value={user.password} />
<!-- <input type="password" bind:value={user.confirmPassword} /> -->
{#if error != undefined}<p>{error}</p>{/if}
<button disabled={loading} on:click={onRegisterClick}>Register</button>
