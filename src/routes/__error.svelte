<script context="module" >
	export function load({ error, status }) {
		return {
			props: {
				message: error.message,
				status // same as status: status
			}
		};
	}
</script>

<script>
	export let message;
	export let status;
</script>

{#if status == 404}
	404 - {message}
{:else}
	Error: {message}  
{/if} 
