<script lang="ts">
import { browser } from '$app/env';

	import { signedInUser } from '$lib/stores/UserStore';
import { UserRepository } from '$lib/utils/repositories/UserRepository';
import { toast } from '$lib/utils/ToastHandler';
import { onMount } from 'svelte';
	let editorText: string;

	async function save() {
        try {
            var res = await UserRepository.updateDescription($signedInUser.username, editorText)
            if(res.success) {
                toast("Profile updated!")
            } else {
                toast("Could not update profile.")
            }
        } catch (err) {
            console.log(err)
            toast("Could not update profile.")
        }
		
	}

    onMount(() => {
        editorText = $signedInUser.description;
    }) 
</script>

{#if browser}
<div class="card lg:card-side card-bordered">
	<div class="card-body">
		<div class="form-control">
			<h2 class="card-title">Profile of {$signedInUser.username}</h2>
			<textarea class="textarea h-24 textarea-bordered" placeholder="Bio" bind:value={editorText} />
		</div>
		<div class="card-actions">
			<button on:click={save} class="btn btn-primary">Save</button>
		</div>
	</div>
</div>
{/if}