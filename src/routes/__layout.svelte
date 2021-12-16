<script lang="ts" context="module">
	let nonProtectedRoutes: string[] = ['/about'];
	let nonAuthedRoutes: string[] = ['/login', '/register'];

	export async function load({ session, page }) {
		let path: string = page.path;

		if (!session) {
			if (nonProtectedRoutes.includes(path) || nonAuthedRoutes.includes(path)) {
				return {
					status: 200
				};
			} else
				return {
					status: 302,
					redirect: '/login'
				};
		} else {
			if (nonAuthedRoutes.includes(path)) {
				return {
					status: 302,
					redirect: '/'
				};
			}
			return {
				status: 200,
			};
		}
	}
</script>

<script lang="ts">
	import '../app.css';
	import { session } from '$app/stores';
	import { logout } from '$lib/stores/UserStore';
	import { goto } from '$app/navigation';

	async function onLogoutClicked() {
		const res = await logout();

		if (res.success) {
			$session = null;
			goto('/');
		}
	}
</script>

<div class="navbar mb-2 shadow-lg bg-neutral text-neutral-content">
	<div class="flex-none px-2 mx-2">
		<a href="/" class="text-lg font-bold"> supabaseTest</a>
	</div>

	<div class="flex-1 px-2 mx-2">
		{#if $session}
			<div class="items-stretch hidden lg:flex">
				<a href="/profile" class="btn btn-ghost btn-sm rounded-btn">Profile</a>
			</div>
		{/if}
	</div>

	<div class="flex-none">
		{#if $session}
			<span on:click={onLogoutClicked} class="btn btn-ghost btn-sm rounded-btn">Log Out</span>
		{:else}
			<a href="/register" class="btn btn-ghost btn-sm rounded-btn">Register</a>
		{/if}
	</div>
	<!-- <div class="flex-none">
		<button class="btn btn-square btn-ghost">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				class="inline-block w-6 h-6 stroke-current"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
				/>
			</svg>
		</button>
	</div> -->
</div>

<div class="container mx-auto">
	<slot />
  </div>