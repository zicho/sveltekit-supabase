<script lang="ts">
	import { login, setUserAndSession, signedInUser } from '$lib/stores/UserStore';
	import { createEventDispatcher } from 'svelte';
	import { LoginUserModel } from '$lib/models/user/LoginUserModel';
	import { addToast } from "as-toast"
	let loading: boolean = false;
	let loginUserModel: LoginUserModel = new LoginUserModel();

	let error: string;
	let dispatch = createEventDispatcher();

	async function onLoginClick() {
		loading = true;

		try {
			const res = await login(loginUserModel);

			console.dir("-----------------")
			console.dir(res.data.userProfileModel.data)
			console.dir("-----------------")

			if (res.success) {
				setUserAndSession(res.data.session, res.data.userProfileModel.data);
				addToast("Welcome " + $signedInUser.username)
				dispatch('success');
				
			} else {
				error = res.message;
			}
		} catch (err) {
			error = err;
		} finally {
			loading = false;
		}
	}
</script>

<div class="card lg:card-side bordered bg-base-200">
	<div class="card-body">
		<h2 class="card-title object-center">Login</h2>
		<form>
			<div class="form-control">
				<label class="label">
					<span class="label-text">Username</span>
				</label>
				<input
					required
					bind:value={loginUserModel.email}
					type="email"
					placeholder="email"
					class="input input-info input-bordered"
				/>
			</div>
			<div class="form-control margin-bottom-l">
				<label class="label">
					<span class="label-text">Password</span>
				</label>
				<input
					required
					bind:value={loginUserModel.password}
					type="password"
					placeholder="password"
					class="input input-info input-bordered"
				/>
			</div>
			<div class="form-control">
				<button
					type="submit"
					class="btn"
					class:loading
					disabled={loading}
					on:click|preventDefault={onLoginClick}
				>
					{#if !loading}
						Login
					{/if}
				</button>
			</div>
		</form>
		<label class="label">
			{#if error != undefined}
				<span class="label-text-alt">{error}</span>
			{/if}
		</label>
		<label class="label">
			<a href="/register"
				><span class="label-text-alt">Wanna join? Press this link to register!</span></a
			>
		</label>
	</div>
</div>
