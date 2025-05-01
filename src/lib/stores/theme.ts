import { writable } from 'svelte/store';

// Check for saved preference or system preference
const getInitialTheme = () => {
	if (typeof window !== 'undefined') {
		const savedTheme = localStorage.getItem('theme');
		if (savedTheme) return savedTheme;

		return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
	}
	return 'light';
};

export const theme = writable(getInitialTheme());

// Subscribe to changes and update localStorage
if (typeof window !== 'undefined') {
	theme.subscribe((value) => {
		localStorage.setItem('theme', value);
		document.documentElement.classList.toggle('dark', value === 'dark');
	});
}
