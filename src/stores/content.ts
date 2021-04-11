import { readable } from "svelte/store"

export const content = readable("", function start (set) {
  set(`I caught it bad just today
You hit me with a call to your place
Ain't been out in a while anyway`)
})
