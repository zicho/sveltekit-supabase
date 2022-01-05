<script lang="ts" context="module">
	import { ToastContainer, FlatToast } from 'svelte-toasts';
	import Fa from 'svelte-fa';
	import { faEnvelope, faUser } from '@fortawesome/free-solid-svg-icons';
	let publicRoutes: string[] = ['/about'];
	let nonAuthedRoutes: string[] = ['/login', '/register'];

	export async function load({ session, page }) {
		let path: string = page.path;

		if (!session) {
			if (publicRoutes.includes(path) || nonAuthedRoutes.includes(path)) {
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
				status: 200
			};
		}
	}
</script>

<script lang="ts">
	import '../app.css';
	import { session } from '$app/stores';
	import { logout, signedInUser } from '$lib/stores/UserStore';
	import { unreadMessages } from '$lib/stores/MessageStore';

	async function onLogoutClicked() {
		const res = await fetch('/api/user/logout', {
			method: 'POST'
		}).finally(() => logout());
	}

	function testFunction() {
		alert('please close me');
	}
</script>

<ToastContainer placement="bottom-right" let:data>
	<FlatToast {data} />
</ToastContainer>

<div class="navbar mb-2 shadow-lg bg-neutral text-neutral-content">
	<div class="flex-none px-2 mx-2">
		<a href="/" class="text-lg font-bold"> supabaseTest</a>
	</div>

	<div class="flex-1 px-2 mx-2">
		{#if $signedInUser && $session}
			<div class="items-stretch hidden lg:flex">
				<a href="/profile/{$signedInUser.username}" class="btn btn-ghost btn-sm rounded-btn"
					><Fa class="margin-right-s" icon={faUser} />{$signedInUser.username}</a
				>
			</div>
			<div class="items-stretch hidden lg:flex">
				<a href="/inbox/" class="btn btn-ghost btn-sm rounded-btn"
					><Fa class="margin-right-s" icon={faEnvelope} />Inbox {#if $unreadMessages > 0}({$unreadMessages}){/if}</a
				>
			</div>
		{/if}
	</div>

	<div class="flex-none">
		{#if $session}
			<!-- svelte-ignore missing-declaration -->
			<span on:click={testFunction} class="btn btn-ghost btn-sm rounded-btn">TEST BUTTON</span>
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
