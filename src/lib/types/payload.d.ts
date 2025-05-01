export type PayloadType = {
	eventType: 'INSERT' | 'UPDATE' | 'DELETE';
	new: Item;
	old: Item;
};
