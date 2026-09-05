import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Merges default recipe classes with consumer overrides.
 * Lives in integrations so components never import the merge library directly.
 */
export function composeClassName(...inputs: ClassValue[]): string {
  // Group-aware last-wins so NativeWind hosts get predictable overrides.
  return twMerge(clsx(inputs));
}
