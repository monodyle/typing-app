import { get, writable } from "svelte/store"
import type { ResultType } from "../types/result.type"
import { content } from "./content"
import { completed, completedCount, start, value } from "./typing"
import { diffChars } from "diff"

export const original: ResultType = {
  wpm: 0,
  cpm: 0,
  acc: 100
}

export const result = writable<ResultType>(original)
export const timer = writable<number>(0)

export const getTimer = () =>
  timer.set(Math.round(new Date().getTime() - get(start).getTime()))

export const updateResult = (wpm: number, cpm: number, acc: number) => {
  result.set({
    wpm,
    cpm,
    acc
  })
}

export const getResult = () => {
  getTimer()

  const user = get(completed)
    .concat(get(value))
    .map(l => l.trim())
  const orig = get(content)
    .split("\n")
    .map(l => l.trim())

  let correct: number = 0
  user.forEach((l, i) => {
    diffChars(l, orig[i]).forEach(c => {
      if (!c.added && !c.removed) {
        correct += c.value.length
      }
    })
  })

  const chars = user.join(" ").replace(/\s/gm, "")
  const words = user.join(" ").split(" ")
  completedCount.set(words.length)
  const mins = get(timer) / 60000

  updateResult(
    Math.round(words.length / mins),
    Math.round(chars.length / mins),
    Math.floor((correct * 100) / user.reduce((p, c) => p + c.length, 0))
  )
}
