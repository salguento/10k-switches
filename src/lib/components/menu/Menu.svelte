<script lang="ts">
	import ThemeToggle from '$lib/components/theme/ThemeToggle.svelte';
	import ColorSelector from '../color-selector/ColorSelector.svelte';
	export let totalClicked: number, userClicked: number;
</script>

<navbar
	class="fixed top-0 z-10 flex w-full items-center justify-center border-b border-gray-300 bg-gray-100 dark:border-gray-700 dark:bg-gray-900"
>
	<div class="flex w-full max-w-7xl justify-between p-4">
		<div class="hidden items-center sm:flex">
			<span class="text-md font-bold md:text-2xl">10k Switches</span>
		</div>

		<div
			class="flex w-full items-center justify-between gap-6 text-center sm:w-auto sm:justify-end sm:text-right"
		>
			<ColorSelector />
			<div class="flex flex-col">
				<span class="text-sm font-medium">Total: {totalClicked}</span>
				<span class="text-sm font-medium">Clicked: {userClicked}</span>
			</div>
			<ThemeToggle />
		</div>
	</div>
</navbar>
