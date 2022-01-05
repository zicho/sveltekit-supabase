<script lang="ts">
	import { signedInUser } from '$lib/stores/UserStore';
	import { inbox, markAllAsRead, updateMessages } from '$lib/stores/MessageStore';
	import { browser } from '$app/env';

	async function onMarkAllAsReadClick() {
		console.log('doing it');

		var res = await markAllAsRead($signedInUser.username);
		if (res.success) {
			await updateMessages($signedInUser.username);
		}
	}
</script>

<h1 class="margin-bottom-l">Inbox.</h1>

<button on:click={onMarkAllAsReadClick}>Mark all as read</button>

{#if browser && $inbox}
	<div class="overflow-x-auto">
		<table class="table w-full">
			<thead>
				<tr>
					<th>From</th>
					<th>Content</th>
					<th></th>
				</tr>
			</thead>
			<tbody>
				{#each $inbox as m}
					<tr class="hover" class:active={!m.isRead}>
						<td>{m.from}</td>
						<td>{m.content}</td>
						<td><input type="checkbox" class="checkbox" /></td>
					</tr>
                    {:else}
                    poo
				{/each}
			</tbody>
		</table>
	</div>
{/if}
