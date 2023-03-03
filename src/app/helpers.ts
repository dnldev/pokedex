/**
 * convert array to set and back to remove duplicate values
 * @param items
 */
export function unique<T>(items: Array<T>): Array<T> {
  return Array.from(new Set(items));
}

export function toTitleCase(string: string): string {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
