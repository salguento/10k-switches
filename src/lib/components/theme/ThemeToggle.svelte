<script>
	import { theme } from '$lib/stores/theme';

	function toggleTheme() {
		theme.update((current) => (current === 'light' ? 'dark' : 'light'));
	}
</script>

<button
	on:click={toggleTheme}
	class="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full p-2 hover:bg-gray-200 focus:outline-none hover:dark:bg-gray-800"
	aria-label="Toggle dark mode"
>
	{#if $theme === 'dark'}
		<span
			><svg
				xmlns="http://www.w3.org/2000/svg"
				width="1em"
				height="1em"
				viewBox="0 0 24 24"
				class="h-6 w-6"
				{...$$props}
				><!-- Icon from Material Symbols by Google - https://github.com/google/material-design-icons/blob/master/LICENSE --><path
					fill="currentColor"
					d="M11 3V2q0-.425.288-.712T12 1t.713.288T13 2v1q0 .425-.288.713T12 4t-.712-.288T11 3m0 19v-1q0-.425.288-.712T12 20t.713.288T13 21v1q0 .425-.288.713T12 23t-.712-.288T11 22m11-9h-1q-.425 0-.712-.288T20 12t.288-.712T21 11h1q.425 0 .713.288T23 12t-.288.713T22 13M3 13H2q-.425 0-.712-.288T1 12t.288-.712T2 11h1q.425 0 .713.288T4 12t-.288.713T3 13m16.75-7.325l-.35.35q-.275.275-.687.275T18 6q-.275-.275-.288-.687t.263-.713l.375-.375q.275-.3.7-.3t.725.3t.288.725t-.313.725M6.025 19.4l-.375.375q-.275.3-.7.3t-.725-.3t-.288-.725t.313-.725l.35-.35q.275-.275.688-.275T6 18q.275.275.288.688t-.263.712m12.3.35l-.35-.35q-.275-.275-.275-.687T18 18q.275-.275.688-.287t.712.262l.375.375q.3.275.3.7t-.3.725t-.725.288t-.725-.313M4.6 6.025l-.375-.375q-.3-.275-.3-.7t.3-.725t.725-.288t.725.313l.35.35q.275.275.275.688T6 6q-.275.275-.687.288T4.6 6.025M12 18q-2.5 0-4.25-1.75T6 12t1.75-4.25T12 6t4.25 1.75T18 12t-1.75 4.25T12 18"
				/></svg
			></span
		>
		<!-- Sun icon for dark mode -->
	{:else}
		<span
			><svg
				xmlns="http://www.w3.org/2000/svg"
				width="1em"
				height="1em"
				viewBox="0 0 24 24"
				class="h-6 w-6"
				{...$$props}
				><!-- Icon from Material Symbols by Google - https://github.com/google/material-design-icons/blob/master/LICENSE --><path
					fill="currentColor"
					d="m15 8l-3-3l3-3l3 3zm5 3l-2-2l2-2l2 2zm-7.925 11q-2.1 0-3.937-.8t-3.2-2.162t-2.163-3.2t-.8-3.938q0-3.65 2.325-6.437T10.225 2q-.45 2.475.275 4.838t2.5 4.137t4.138 2.5t4.837.275q-.65 3.6-3.45 5.925T12.075 22"
				/></svg
			></span
		>
		<!-- Moon icon for light mode -->
	{/if}
</button>
