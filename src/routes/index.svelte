<script lang="ts">
	import Register from '$lib/components/Register.svelte';
	import { goto } from '$app/navigation';

	function goToProfile() {
		goto('/profile');
	}
</script>

<button on:click={goToProfile}>Profile</button>
<Register on:success={goToProfile} />
