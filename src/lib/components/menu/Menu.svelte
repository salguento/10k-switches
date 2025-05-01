<script lang="ts">
	import ThemeToggle from '$lib/components/theme/ThemeToggle.svelte';
	export let totalClicked: number, userClicked: number;
</script>

<navbar
	class="fixed top-0 z-10 flex w-full items-center justify-center border-b border-gray-300 bg-gray-100 dark:border-gray-700 dark:bg-gray-900"
>
	<div class="flex w-full max-w-7xl justify-between p-4">
		<div class="flex items-center">
			<span class="text-2xl font-bold">10k Switches</span>
		</div>
		<div class="flex gap-6 text-right">
			<div class="flex flex-col">
				<span class="text-sm font-semibold">Total</span>
				<span>{totalClicked} / 10.000</span>
			</div>
			<div class="flex flex-col">
				<span class="text-sm font-semibold">Clicked</span>
				<span>{userClicked}</span>
			</div>
			<ThemeToggle />
		</div>
	</div>
</navbar>
