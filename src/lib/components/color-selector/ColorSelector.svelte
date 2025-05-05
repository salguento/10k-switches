<script lang="ts">
	import { onMount } from 'svelte';
	import { switchColorStore } from '$lib/stores/switchColor';

	let selectedColor: string = $switchColorStore || 'bg-sky-500';

	function updateValue() {
		switchColorStore.set(selectedColor);
	}
	// Type definitions
	type MenuOption = {
		id: number | string;
		value: string;
	};

	// Internal state with type annotations
	let isOpen: boolean = false;
	let menuButton: HTMLButtonElement;
	let menu: HTMLDivElement;

	// Menu options with type annotation
	const options: MenuOption[] = [
		{ id: 1, value: 'bg-orange-500' },
		{ id: 2, value: 'bg-yellow-500' },
		{ id: 3, value: 'bg-teal-500' },
		{ id: 4, value: 'bg-sky-500' },
		{ id: 5, value: 'bg-purple-500' },
		{ id: 6, value: 'bg-rose-500' }
	];

	// Styling constants
	const buttonClass = '';
	const optionClass =
		'block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900';

	// Close menu when clicking outside
	function handleClickOutside(event: MouseEvent) {
		if (
			menu &&
			!menu.contains(event.target as Node) &&
			!menuButton.contains(event.target as Node)
		) {
			isOpen = false;
		}
	}

	// Toggle menu visibility
	function toggleMenu() {
		isOpen = !isOpen;
	}

	// Handle option selection
	function selectOption(option: MenuOption) {
		selectedColor = option.value;
		updateValue();
		isOpen = false;
	}

	// Add event listener when component mounts
	onMount(() => {
		document.addEventListener('click', handleClickOutside);
		return () => {
			document.removeEventListener('click', handleClickOutside);
		};
	});
</script>

<div class="relative flex items-center justify-center text-left">
	<!-- Menu Button -->
	<button
		bind:this={menuButton}
		on:click={toggleMenu}
		class={`h-8 w-8 rounded-full ring-2 ring-transparent hover:ring-gray-500 dark:hover:ring-white ${selectedColor} cursor-pointer`}
		aria-haspopup="true"
		aria-expanded={isOpen}
		aria-label="Select color"
	>
	</button>

	<!-- Dropdown Menu -->
	{#if isOpen}
		<div
			bind:this={menu}
			class="absolute left-0 z-10 mt-82 w-fit origin-top-right rounded-xl bg-gray-100 shadow-lg ring ring-gray-300 sm:right-0 sm:left-auto sm:mt-28 dark:bg-gray-800 dark:ring-gray-700"
			role="menu"
			aria-labelledby="menu-button"
			tabindex="-1"
		>
			<div class="flex flex-col gap-3 p-3 sm:flex-row" role="none">
				{#each options as option (option.id)}
					<button
						on:click={() => selectOption(option)}
						class={`h-8 w-8 rounded-full ${option.value} cursor-pointer ring-2 ring-transparent hover:ring-gray-500 dark:hover:ring-white`}
						role="menuitem"
						tabindex="-1"
						aria-label={option.value}
					>
					</button>
				{/each}
			</div>
		</div>
	{/if}
</div>

<style>
	button {
		transition: background-color 0.2s ease;
	}
</style>
