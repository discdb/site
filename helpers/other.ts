export const filterChangedKeys = (oldObj: any, newObj: any) =>
	Object.keys(newObj).reduce(
		(filtered: any, key) =>
			JSON.stringify(newObj?.[key]) !== JSON.stringify(oldObj[key])
				? { ...filtered, [key]: newObj[key] }
				: filtered,
		{}
	);
