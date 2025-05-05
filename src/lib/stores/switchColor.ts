import { writable, type Writable } from 'svelte/store';

// Define the store type
type LocalStorageStore = {
	subscribe: Writable<string>['subscribe'];
	set: (value: string) => void;
	update: (updater: (value: string) => string) => void;
};

// Function to create the store
export function createLocalStorageStore(key: string, defaultValue: string): LocalStorageStore {
	// Check if we're running in browser environment
	const isBrowser = typeof window !== 'undefined';

	// Get initial value from localStorage or use default
	const initialValue = isBrowser ? (localStorage.getItem(key) ?? defaultValue) : defaultValue;

	// Create the writable store
	const { subscribe, set: storeSet, update: storeUpdate } = writable<string>(initialValue);

	// Custom set function that updates both store and localStorage
	const set = (value: string) => {
		if (isBrowser) {
			localStorage.setItem(key, value);
		}
		storeSet(value);
	};

	// Custom update function that updates both store and localStorage
	const update = (updater: (value: string) => string) => {
		if (isBrowser) {
			storeUpdate((current) => {
				const newValue = updater(current);
				localStorage.setItem(key, newValue);
				return newValue;
			});
		} else {
			storeUpdate(updater);
		}
	};

	// Initialize the value in localStorage if it doesn't exist
	if (isBrowser && localStorage.getItem(key) === null) {
		localStorage.setItem(key, defaultValue);
	}

	return {
		subscribe,
		set,
		update
	};
}

// Example store instance
export const switchColorStore = createLocalStorageStore('switchColor', 'bg-sky-500');
