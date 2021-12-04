<script lang="ts">
	import { register } from '$lib/stores/UserStore';
	import { RegisterUserModel } from '$lib/models/user/RegisterUserModel';
	import { createEventDispatcher } from 'svelte';
	import { session } from '$app/stores';
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

		try {
			const res = await register(user);

			if (res.success) {
				$session = res.data;
				dispatch('success');
			} else {
				error = res.message;
			}
		} catch {
			error = 'Error';
		} finally {
			loading = false;
		}
	}
</script>

<div class="card lg:card-side bordered bg-base-200">
	<div class="card-body">
		<h2 class="card-title object-center">Register</h2>
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
		<div class="form-control">
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
		<div class="form-control margin-bottom-l">
			<label class="label">
				<span class="label-text">Confirm password</span>
			</label>
			<input
				required
				bind:value={user.confirmPassword}
				type="password"
				placeholder="password"
				class="input input-info input-bordered"
			/>
		</div>
		<div class="form-control">
			<button class="btn" class:loading disabled={loading} on:click={onRegisterClick}>
				{#if !loading}
					Register
				{/if}
			</button>
			<label class="label">
				{#if error != undefined}
					<span class="label-text-alt">{error}</span>
				{/if}
			</label>
		</div>
		<label class="label">
			<a href="/login"><span class="label-text-alt">Already a member? Press here to login</span></a>
		</label>
	</div>
</div>
