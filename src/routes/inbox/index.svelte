<script lang="ts">
	import { signedInUser } from '$lib/stores/UserStore';
	import { inbox, markAllAsRead, updateMessages } from '$lib/stores/MessageStore';
	import { browser } from '$app/env';
	import { toast } from '$lib/utils/ToastHandler';
import { MessageRepository } from '$lib/utils/repositories/MessageRepository';
import { Tables } from '$lib/utils/DatabaseTypes';

	let markAllChecked: boolean = false;

	async function onMarkAllAsReadClick() {
		console.log('doing it');

		var res = await markAllAsRead($signedInUser.username);
		if (res.success) {
			await updateMessages($signedInUser.username);
			toast('All messages marked as read');
			markAllChecked = false
		}
	}

	async function deleteMarked() {
		let ids = $inbox.filter((m) => m.checked).map(m => m.id);

		await MessageRepository.deleteRange(Tables.Messages, ids);
		await updateMessages($signedInUser.username);
	}

	function toggleAll() {
		$inbox.forEach((m) => (m.checked = !markAllChecked));
		$inbox = $inbox;
	}
</script>

<h1 class="margin-bottom-l">Inbox.</h1>

<button class="btn btn-primary" on:click={onMarkAllAsReadClick}>Mark all as read</button>
<button class="btn btn-error" on:click={deleteMarked}>Delete marked</button>

<div class="overflow-x-auto">
	{#if browser && $inbox}
		<table class="table w-full">
			<thead>
				<tr>
					<th>From</th>
					<th>Content</th>
					<th>Sent</th>
					<td
						><input
							type="checkbox"
							bind:checked={markAllChecked}
							on:click={toggleAll}
							class="checkbox"
						/></td
					>
				</tr>
			</thead>
			<tbody>
				{#each $inbox as m (m.id)}
					<tr class="hover" class:active={!m.isRead}>
						<td>{m.from}</td>
						<td>{m.content}</td>
						<td>{new Date(m.created_at)}</td>
						<td><input type="checkbox" bind:checked={m.checked} class="checkbox" /></td>
					</tr>
				{/each}
			</tbody>
		</table>
	{:else}
		Loading...
	{/if}
</div>
