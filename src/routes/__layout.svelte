<script lang="ts" context="module">
	export async function load({ session, page }) {

		console.dir("Layout: " + session)

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
