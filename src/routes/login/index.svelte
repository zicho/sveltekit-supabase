<script lang="ts">
	import { goto } from '$app/navigation';
	import Login from '$lib/components/Login.svelte';

	function goToProfile() {
		goto('/');
	}
</script>

<div class="container margin-top-xxl">
	<Login on:success={goToProfile} />
</div>
