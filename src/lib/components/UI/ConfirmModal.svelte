<script>
	import { browser } from '$app/env';
	import { confirmModalIsOpen, modalMessage, onModalConfirmClicked } from '$lib/stores/ModalStore';
</script>

{#if browser}
	<div id="confirm-modal" class="modal" class:modal-open={$confirmModalIsOpen}>
		<div class="modal-box">
			<p>
				{$modalMessage}
			</p>
			<div class="modal-action">
				<!-- <a class="btn" on:click={() => ($modalIsOpen = false)}>Close</a> -->
				<a class="btn btn-primary" on:click={() => onModalConfirmClicked()}>Yes</a>
				<a class="btn btn-error" on:click={() => ($confirmModalIsOpen = false)}>No</a>
			</div>
		</div>
	</div>
{/if}
