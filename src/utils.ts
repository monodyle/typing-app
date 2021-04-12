import { original, result, timer } from "./stores/result"
import { completed, current, finished, start, value } from "./stores/typing"

export const reset = () => {
  result.set(original)
  timer.set(0)
  start.set(null)
  completed.set([])
  current.set(0)
  finished.set(false)
  value.set("")
}

export const randomItem = (arr: any[]) => arr[Math.floor(Math.random() * arr.length)]
