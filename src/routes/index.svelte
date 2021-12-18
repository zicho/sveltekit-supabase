<script lang="ts">
import { signedInUser } from "$lib/stores/UserStore";

	import { Toasts, addToast } from "as-toast"

	import { onMount } from 'svelte';

	onMount(() => {
        console.log("mounted")
        
	});
</script>

<h1>Logged in n' shit</h1>

