<script lang="ts">
	import Register from '$lib/components/Register.svelte';
	import { goto } from '$app/navigation';
import Login from '$lib/components/Login.svelte';

	function goToProfile() {
		goto('/profile');
	}
</script>

<button on:click={goToProfile}>Profile</button>
<Login on:success={goToProfile} />
