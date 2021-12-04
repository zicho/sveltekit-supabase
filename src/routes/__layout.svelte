<script lang="ts" context="module">
	export async function load({ session, page }) {
        if (!session) {
			if (page.path != '/')
				return {
					status: 302,
					redirect: '/'
				};
		}

		return {
			status: 200
		};
	}
</script>

<slot />
