export function camelToUnderscore(value: string) {
	return value.replace(/([A-Z])/g, '_$1').toLowerCase();
}
