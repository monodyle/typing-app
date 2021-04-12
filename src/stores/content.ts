import { readable } from "svelte/store"
import { lyricsApi, songs } from "../config"
import { randomItem } from "../utils"

const getRandomSong = (): [string, string] => {
  const artist = randomItem(Object.keys(songs))
  const song = randomItem(songs[artist])
  return [artist, song]
}

export const content = readable("", function start (set) {
  fetch(lyricsApi + encodeURI(getRandomSong().join("/")))
    .then(res => res.json())
    .then(data => {
      if (data?.lyrics) set(data.lyrics.replace(/\n{2,}/g, "\n").trim())
    })
})
