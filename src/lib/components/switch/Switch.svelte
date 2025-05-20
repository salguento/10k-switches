<script lang="ts">
	import { onMount } from 'svelte';
	import { supabase } from '$lib/utils/supabaseClient';
	import { switchColorStore } from '$lib/stores/switchColor';
	export let state: boolean = false;
	export let id: string;
	export let color: string;
	export let clickedItem: number;

	let bgColor: string;

	bgColor =
		'dark:peer-checked:' + (color || 'bg-sky-500') + ' peer-checked:' + (color || 'bg-sky-500');

	// Define all possible color classes that might be passed
	const colorOptions = [
		'dark:peer-checked:bg-rose-500 peer-checked:bg-rose-500',
		'dark:peer-checked:bg-teal-500 peer-checked:bg-teal-500',
		'dark:peer-checked:bg-orange-500 peer-checked:bg-orange-500',
		'dark:peer-checked:bg-yellow-500 peer-checked:bg-yellow-500',
		'dark:peer-checked:bg-purple-500 peer-checked:bg-purple-500',
		'dark:peer-checked:bg-sky-500 peer-checked:bg-sky-500'
	];

	// Force Tailwind to process these classes (even though unused)
	const hiddenClasses = colorOptions.join(' ');

	const updateColor = (c: string) => {
		bgColor = 'dark:peer-checked:' + (c || 'bg-sky-500') + ' peer-checked:' + (c || 'bg-sky-500');
	};
	async function updateRow(itemId: string, newStatus: boolean) {
		updateColor($switchColorStore);
		try {
			const { data, error } = await supabase
				.from('switches')
				.update({ state: newStatus, color: $switchColorStore })
				.eq('id', itemId);

			console.log(color);
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
	<div class="hidden {hiddenClasses}"></div>
	<label class="inline-flex cursor-pointer items-center">
		<input
			type="checkbox"
			value=""
			class="peer sr-only"
			bind:checked={state}
			on:click={() => updateRow(id, !state)}
		/>
		<div
			class={`peer relative h-6 w-11 rounded-full bg-gray-600  after:absolute after:start-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:after:translate-x-full peer-checked:after:border-white rtl:peer-checked:after:-translate-x-full dark:border-gray-600 dark:bg-gray-700 ${bgColor}`}
		></div>
	</label>
</div>

<style>
	/* input {
		height: 24px;
		width: 24px;
	} */
</style>
