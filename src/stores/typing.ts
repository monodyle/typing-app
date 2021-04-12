import { writable } from "svelte/store"

export const completedCount = writable<number>(0)
export const start = writable<Date>(null)
export const completed = writable<string[]>([])
export const current = writable<number>(0)
export const finished = writable<boolean>(false)
export const value = writable("")
