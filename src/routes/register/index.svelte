<script lang="ts">
	import { goto } from '$app/navigation';
	import Register from '$lib/components/Register.svelte';
	import { user } from '$lib/stores/UserStore';

	function goToProfile() {
		goto(`/profile/${$user.username}`);
	}
</script>

<div class="container margin-top-xxl">
	<Register on:success={goToProfile} />
</div>
