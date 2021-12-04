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
					redirect: '/',
					props: {
						session: session
					}
				};
			}
			return {
				status: 200,
				props: {
					session: session
				}
			};
		}
	}
</script>

<script lang="ts">
	import '../app.css';
	import { loggedIn } from '$lib/stores/UserStore';
	import { browser } from '$app/env';
	import type { Session } from '@supabase/gotrue-js';
	import { session as s } from '$app/stores';
	import { logout } from '$lib/stores/UserStore';
	import { goto } from '$app/navigation';

	export let session: Session;

	if (session && browser) {
		$loggedIn = true;
	}

	async function onLogoutClicked() {
		const res = await logout();

		if (res.success) {
			$s = null;
			goto('/');
		}
	}
</script>

<div class="navbar mb-2 shadow-lg bg-neutral text-neutral-content">
	<div class="flex-none px-2 mx-2">
		<a href="/" class="text-lg font-bold"> supabaseTest</a>
	</div>

	<div class="flex-1 px-2 mx-2">
		{#if $loggedIn}
			<div class="items-stretch hidden lg:flex">
				<a class="btn btn-ghost btn-sm rounded-btn"> Home </a>
				<a class="btn btn-ghost btn-sm rounded-btn"> Portfolio </a>
				<a class="btn btn-ghost btn-sm rounded-btn"> About </a>
				<a class="btn btn-ghost btn-sm rounded-btn"> Contact </a>
			</div>
		{/if}
	</div>

	<div class="flex-none">
		{#if $loggedIn}
			<a on:click={onLogoutClicked} class="btn btn-ghost btn-sm rounded-btn">Log Out</a>
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

<slot />
