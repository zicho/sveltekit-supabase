<script lang="ts">
	import { goto } from '$app/navigation';
import { session } from '$app/stores';

	import { logout } from '$lib/services/UserService';

	async function onLogoutClicked() {
		const res = await logout();

		

		if (res.success) {
			$session = null;
			goto('/');
		}
	}
</script>

<h1>Profile</h1>

<button on:click={onLogoutClicked}>Log Out!</button>
