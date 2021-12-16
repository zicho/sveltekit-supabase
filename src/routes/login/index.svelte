<script lang="ts">
	import { goto } from '$app/navigation';
	import Login from '$lib/components/Login.svelte';

	function goToStartPage() {
		goto('/');
	}
</script>

<div class="container margin-top-xxl">
	<Login on:success={goToStartPage} />
</div>
