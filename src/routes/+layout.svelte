<script lang="ts">
	import '../app.css';
	import { browser } from '$app/environment';
	import { onMount } from 'svelte';

	let theme: 'light' | 'dark' = 'light';

	onMount(() => {
		if (!browser) return;

		// Sync with system changes
		const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
		const updateTheme = () => {
			const newTheme = mediaQuery.matches ? 'dark' : 'light';
			document.documentElement.classList.toggle('dark', newTheme === 'dark');
			theme = newTheme;
		};

		mediaQuery.addEventListener('change', updateTheme);

		return () => mediaQuery.removeEventListener('change', updateTheme);
	});

	function toggleTheme() {
		theme = theme === 'light' ? 'dark' : 'light';
		document.documentElement.classList.toggle('dark', theme === 'dark');
		document.cookie = `theme=${theme}; path=/; max-age=31536000`;
	}
	let { children } = $props();
</script>

<svelte:head>
	<title>10k Switches</title>
	<meta name="description" content="Page description" />
</svelte:head>
<main class="h-full w-full">
	{@render children()}
</main>
