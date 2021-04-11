import { readable } from "svelte/store";

export const time = readable(new Date(), function start(set) {
  const interval = setInterval(() => {
    set(new Date())
  }, 60000)

  return function stop() {
    clearInterval(interval)
  }
})

export const formatter = new Intl.DateTimeFormat("en", {
  hour12: false,
  hour: '2-digit',
  minute: '2-digit'
})
