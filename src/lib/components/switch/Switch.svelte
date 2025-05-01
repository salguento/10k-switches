<script lang="ts">
	import { supabase } from '$lib/utils/supabaseClient';
	import { indexCheck } from '$lib/utils/indexCheck';
	export let state: boolean = false;
	export let id: string;
	export let index: number;
	export let clickedItem: number;

	async function updateRow(itemId: string, newStatus: boolean) {
		try {
			const { data, error } = await supabase
				.from('switches')
				.update({ state: newStatus })
				.eq('id', itemId);

			if (error) throw error;

			// Update local state
			// items = items.map((item) => (item.id === itemId ? { ...item, completed: newStatus } : item));
		} catch (error) {
			console.error('Update error:', error);
		}
		clickedItem++;
	}
</script>

<div class="">
	<label class="inline-flex cursor-pointer items-center">
		<input
			type="checkbox"
			value=""
			class="peer sr-only"
			bind:checked={state}
			on:click={() => updateRow(id, !state)}
		/>
		<div
			class={`peer relative h-6 w-11 rounded-full bg-gray-600  after:absolute after:start-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:after:translate-x-full peer-checked:after:border-white rtl:peer-checked:after:-translate-x-full dark:border-gray-600 dark:bg-gray-700 ${indexCheck(index) ? `peer-checked:bg-pink-600 dark:peer-checked:bg-pink-600` : `peer-checked:bg-blue-600 dark:peer-checked:bg-blue-600`}`}
		></div>
	</label>
</div>

<style>
	/* input {
		height: 24px;
		width: 24px;
	} */
</style>
