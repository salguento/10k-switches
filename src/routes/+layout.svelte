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
	<meta
		name="description"
		content="Explore 10,000 interactive switches you can turn on and off in 6 vibrant colors! "
	/>
	<meta property="og:title" content="10k Switches" />
	<meta
		property="og:description"
		content="Explore 10,000 interactive switches you can turn on and off in 6 vibrant colors!"
	/>
	<meta property="og:image" content="https://10kswitches.salguento.xyz/og-image.jpg" />
	<meta property="og:url" content="https://10kswitches.salguento.xyz" />
	<meta property="og:type" content="website" />
</svelte:head>
<main class="h-full w-full">
	{@render children()}
</main>
