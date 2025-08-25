import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function normalizeBrand(str: string) {
  return str.toLowerCase().replace(/[^a-z]/g, "")
}
