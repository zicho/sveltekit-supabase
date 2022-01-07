<script lang="ts">
	import { signedInUser } from '$lib/stores/UserStore';
	import { inbox, markAsRead, updateMessages } from '$lib/stores/MessageStore';
	import { browser } from '$app/env';
	import { toast } from '$lib/utils/ToastHandler';
	import { MessageRepository } from '$lib/utils/repositories/MessageRepository';
	import { Tables } from '$lib/utils/DatabaseTypes';

	let markAllChecked: boolean, deleteInProgress: boolean;

	$: deleteButtonEnabled = $inbox ? $inbox.filter((m) => m.checked).map((m) => m.id).length != 0 : false;
	$: markAllReadButtonEnabled = $inbox
		? $inbox.filter((m) => !m.isRead).map((m) => m.id).length != 0
		: false;

	function getSelectedMessageIds(): number[] {
		if ($inbox) return $inbox.filter((m) => m.checked).map((m) => m.id);
		else return null;
	};

	async function onMarkAsReadClick() {
		var res = await markAsRead($signedInUser.username, getSelectedMessageIds());
		if (res.success) {
			await updateMessages($signedInUser.username);
			toast('All messages marked as read');
			markAllChecked = false;
		}
	}

	async function onDeleteClicked() {
		try {
			deleteInProgress = true;
			let ids = $inbox.filter((m) => m.checked).map((m) => m.id);
			await MessageRepository.deleteRange(Tables.Messages, getSelectedMessageIds());
			await updateMessages($signedInUser.username);
		} catch (err) {
			console.log(err);
		} finally {
			deleteInProgress = false;
		}
	}

	function toggleAll() {
		$inbox.forEach((m) => (m.checked = !markAllChecked));
		$inbox = $inbox;
	}
</script>

<h1 class="margin-bottom-l">Inbox.</h1>

<button class="btn btn-primary" disabled={!markAllReadButtonEnabled} on:click={onMarkAsReadClick}
	>Mark as read</button
>
<button disabled={!deleteButtonEnabled} class="btn btn-error" on:click={onDeleteClicked}>Delete</button>

<div class="overflow-x-auto">
	{#if browser && $inbox}
		{#if $inbox.length == 0}
			No messages
		{:else}
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
		{/if}
	{:else}
		Loading...
	{/if}
</div>
