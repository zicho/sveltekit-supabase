<script>
import { browser } from "$app/env";
import { messageModalIsOpen, modalMessage } from "$lib/stores/ModalStore";
</script>

{#if browser}
<div id="message-modal" class="modal" class:modal-open={$messageModalIsOpen}>
	<div class="modal-box">
		<p>
			{$modalMessage}
		</p>
		<div class="modal-action">
			<a class="btn" on:click={() => ($messageModalIsOpen = false)}>Close</a> 
		</div>
	</div>
</div>
{/if}