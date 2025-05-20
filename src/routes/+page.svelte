<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { RealtimeChannel } from '@supabase/supabase-js';
	import { supabase } from '$lib/utils/supabaseClient';
	import type { PayloadType } from '$lib/types/payload';
	import type { Item } from '$lib/types/item';
	import type { PageData } from './$types';
	import Menu from '../lib/components/menu/Menu.svelte';
	import Switch from '../lib/components/switch/Switch.svelte';
	import Footer from '$lib/components/footer/Footer.svelte';

	let items: Item[];
	let trueItems: number = 0;
	let clickedItem: number = 0;
	let subscription: RealtimeChannel | null = null;
	let componentKey = 0; // Key for forcing reload

	// Fetch initial data
	async function fetchData(): Promise<void> {
		const { data, error } = await supabase
			.from('switches')
			.select('*')
			.order('index', { ascending: true });

		if (!error) {
			items = data;
			trueItems = data.filter((i) => i.state === true).length;
		}
	}

	// Handle realtime updates
	function handleRealtimeUpdate(payload: PayloadType): void {
		if (payload.eventType === 'INSERT') {
			items = [...items, payload.new];
		} else if (payload.eventType === 'UPDATE') {
			items = items.map((item) => (item.id === payload.new.id ? payload.new : item));
			trueItems = items.filter((i) => i.state === true).length;
		} else if (payload.eventType === 'DELETE') {
			items = items.filter((item) => item.id !== payload.old.id);
		}
		componentKey += 1; // Change key to force reload
	}

	function createTypedChannel() {
		return supabase.channel('table-db-changes') as unknown as {
			on: (
				event: 'postgres_changes',
				filter: {
					event: '*';
					schema: 'public';
					table: string;
				},
				callback: (payload: any) => void
			) => RealtimeChannel;
		};
	}

	onMount(async () => {
		await fetchData();

		subscription = createTypedChannel()
			.on(
				'postgres_changes',
				{
					event: '*',
					schema: 'public',
					table: 'switches'
				},
				(payload) => {
					handleRealtimeUpdate(payload);
				}
			)
			.subscribe();
	});

	onDestroy(() => {
		if (subscription) {
			supabase.removeChannel(subscription);
		}
	});
</script>

<Menu totalClicked={trueItems} userClicked={clickedItem} />
<div class="flex h-auto w-full flex-col items-center pt-24">
	{#key componentKey}
		<div
			class="grid w-auto max-w-7xl grid-flow-row grid-cols-5 gap-2 px-4 pb-12 sm:grid-cols-8 md:grid-cols-16 xl:grid-cols-25"
		>
			{#each items as item (item.id)}
				<Switch state={item.state} id={item.id} bind:clickedItem color={item.color} />
			{/each}
		</div>
	{/key}
</div>
<Footer />
