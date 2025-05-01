<script>
	import { theme } from '$lib/stores/theme';

	function toggleTheme() {
		theme.update((current) => (current === 'light' ? 'dark' : 'light'));
	}
</script>

<button
	on:click={toggleTheme}
	class="flex h-10 w-10 items-center justify-center rounded-full p-2 hover:bg-gray-200 focus:outline-none hover:dark:bg-gray-800"
	aria-label="Toggle dark mode"
>
	{#if $theme === 'dark'}
		<span>☀️</span> <!-- Sun icon for dark mode -->
	{:else}
		<span>🌙</span> <!-- Moon icon for light mode -->
	{/if}
</button>
