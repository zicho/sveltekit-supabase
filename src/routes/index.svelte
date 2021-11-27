<script lang="ts">
	import { register } from '$lib/services/UserService';
	import { RegisterUserModel } from '$lib/models/user/RegisterUserModel';
	// import { post } from '$lib/utils/EndpointClient';

	let loading: boolean = false;
	let user: RegisterUserModel = new RegisterUserModel();
	let error: string;

	async function onRegisterClick() {
		error = undefined;

		try {
			const res = await register(user);

			if (res.success) {
				alert('yeah');
			} else {
				error = res.message;
			}
		} catch (err) {
			console.log(err);
			error = 'Error';
		}
	}

	// const register = async () => {
	// 	try {
	// 		loading = true;
	// 		const res = await fetch('api/register', {
	// 			method: 'POST',
	// 			body: JSON.stringify(user)
	// 		});

	// 		let data = await res.json();

	// 		if(res.ok) {
	// 			alert("ok")
	// 		} else {
	// 			alert("no can do")
	// 		}
	// 	} catch (error) {
	// 		error = error.error_description || error.message;
	// 	} finally {
	// 		loading = false;
	// 	}
	// };

	const get = async () => {
		try {
			loading = true;
			const res = await fetch('api/register');
		} catch (error) {
			error = error.error_description || error.message;
		} finally {
			loading = false;
		}
	};
</script>

<h1>Register</h1>
<input type="email" bind:value={user.email} />
<input type="password" bind:value={user.password} />
<!-- <input type="password" bind:value={user.confirmPassword} /> -->
{#if error != undefined}<p>{error}</p>{/if}
<button disabled={loading} on:click={onRegisterClick}>Register</button>
