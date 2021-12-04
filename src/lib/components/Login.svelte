<script lang="ts">
	import { login } from '$lib/stores/UserStore';
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

<div class="card lg:card-side bordered bg-base-200">
	<div class="card-body">
		<h2 class="card-title object-center">Login</h2>
		<div class="form-control">
			<label class="label">
				<span class="label-text">Username</span>
			</label>
			<input
				required
				bind:value={user.email}
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
				bind:value={user.password}
				type="password"
				placeholder="password"
				class="input input-info input-bordered"
			/>
		</div>
		<div class="form-control">
			<button class="btn" class:loading disabled={loading} on:click={onLoginClick}>
				{#if !loading}
					Login
				{/if}
			</button>
			<label class="label">
				{#if error != undefined}
					<span class="label-text-alt">{error}</span>
				{/if}
			</label>
		</div>
		<label class="label">
			<a href="/register"><span class="label-text-alt">Wanna join? Press this link to register!</span></a>
		</label>
	</div>
</div>
