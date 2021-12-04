<script lang="ts">
	import { goto } from '$app/navigation';
	import Register from '$lib/components/Register.svelte';

	function goToProfile() {
		goto('/');
	}
</script>

<div class="container margin-top-xxl">
	<Register on:success={goToProfile} />
</div>
