<script lang="ts">
	

	import { PrivateMessageModel } from '$lib/models/messaging/PrivateMessageModel';

	import { sendPrivateMessage } from '$lib/services/MessageService';

	import { createEventDispatcher } from 'svelte';

    export let sender, recipient: string;

	var model: PrivateMessageModel = new PrivateMessageModel();

    model.from = sender
    model.to = recipient
    model.title = "Message from " + sender;

	let error: string;
	let dispatch = createEventDispatcher();

	async function onSubmit() {
		try {
			const res = await sendPrivateMessage(model);
            if(res.success) {
                dispatch('success')
                alert("success")
            }
		} catch (err) {
console.log(err)
        }
	}
</script>
		<form>
			<div class="form-control">
				<label class="label">
					<span class="label-text">Title</span>
				</label>
				<input
					required
					bind:value={model.title}
					type="text"
					placeholder="title"
					class="input input-info input-bordered"
				/>
			</div>
			<div class="form-control margin-bottom-l">
				<label class="label">
					<span class="label-text">Content</span>
				</label>
				<input
					required
					bind:value={model.content}
					type="text"
					placeholder="content"
					class="input input-info input-bordered"
				/>
			</div>
			<div class="form-control">
				<button
					type="submit"
					class="btn"
					on:click|preventDefault={onSubmit}
				>Send
				</button>
			</div>
		</form>
		<label class="label">
			{#if error != undefined}
				<span class="label-text-alt">{error}</span>
			{/if}
		</label>
