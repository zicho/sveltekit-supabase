<script lang="ts">
	import { register, setUserAndSession } from '$lib/stores/UserStore';
	import { RegisterUserModel } from '$lib/models/user/RegisterUserModel';
	import { createEventDispatcher } from 'svelte';
	import { user } from '$lib/stores/UserStore';

	let loading: boolean = false;
	let registerUserModel: RegisterUserModel = new RegisterUserModel();
	let error: string;
	let dispatch = createEventDispatcher();

	async function onRegisterClick() {
		loading = true;

		if (!registerUserModel.validate().success) {
			error = registerUserModel.validate().message;
			loading = false;
			return;
		}

		try {
			const res = await register(registerUserModel);

			if (res.success) {

				console.dir(res.data)

				setUserAndSession(res.data.session, res.data.userProfileModel);
				console.dir($user)
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
		<h2 class="card-title object-center">Register</h2>
		<form>
			<div class="form-control">
				<label class="label">
					<span class="label-text">Email</span>
				</label>
				<input
					required
					bind:value={registerUserModel.email}
					type="email"
					placeholder="email"
					class="input input-info input-bordered"
				/>
			</div>
			<div class="form-control">
				<label class="label">
					<span class="label-text">Username</span>
				</label>
				<input
					required
					bind:value={registerUserModel.username}
					type="text"
					placeholder="username"
					class="input input-info input-bordered"
				/>
				<label class="label">
					<span class="label-text-alt">Your username will be visible to other users</span>
				</label>
			</div>
			<div class="form-control">
				<label class="label">
					<span class="label-text">Password</span>
				</label>
				<input
					required
					bind:value={registerUserModel.password}
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
					bind:value={registerUserModel.confirmPassword}
					type="password"
					placeholder="password"
					class="input input-info input-bordered"
				/>
			</div>
			<div class="form-control">
				<button
					class="btn"
					class:loading
					disabled={loading}
					on:click|preventDefault={onRegisterClick}
				>
					{#if !loading}
						Register
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
			<a href="/login"><span class="label-text-alt">Already a member? Press here to login</span></a>
		</label>
	</div>
</div>
