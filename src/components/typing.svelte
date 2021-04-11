<script lang="ts">
  import { onMount } from "svelte"
  import { content } from "../stores/content"
  import { getResult, getTimer } from "../stores/result"
  import { completed, current, finished, value, start } from "../stores/typing"

  $: next = $current + 1
  $: lines = $content
    .trim()
    .split("\n")
    .map((l) => l.trim())
  $: total_line = lines.length

  const correct = (letter: string, index: number) => $value[index] === letter

  const goNext = () => {
    if (next < total_line) {
      current.update((val) => val + 1)
    } else {
      finished.set(true)
      getTimer()
    }
  }

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Enter") {
      goNext()
      value.set("")
    }
  }

  const handleInput = (
    e: InputEvent & Event & { currentTarget: EventTarget & HTMLInputElement }
  ) => {
    // set start
    if ($current === 0 && $value.length === 1) {
      console.log("Start!")
      start.set(new Date())
    }

    // Handle backspace
    if (
      e.inputType === "deleteContentBackward" &&
      $value === "" &&
      $current > 0
    ) {
      current.update((val) => val - 1)
    }

    // Handle end line
    if (e.data === " " && $value.length + 1 >= lines[$current].length) {
      completed.update((arr) => arr.concat($value.trim()))
      goNext()
      value.set("")
    }

    if ($start) getResult()
  }

  let ref = null
  onMount(() => {
    ref.focus()
  })
</script>

<style lang="postcss">
  .next {
    @apply opacity-50;
  }
  .demo {
    @apply text-gray-400 text-xl leading-relaxed mb-4;
  }
  .input {
    @apply block w-full text-xl text-gray-800 border py-2 px-3 -mx-3 border-gray-100 rounded-lg;
  }
  .input::placeholder {
    @apply text-gray-200;
  }
  .input:focus {
    @apply bg-gray-100 outline-none;
  }
  .correct {
    @apply text-gray-700;
  }
  .incorrect {
    @apply text-orange-400 underline;
  }
</style>

<div class="entry">
  <div class="demo">
    <div class="next">
      {#if next < total_line}{lines[next]}{:else}<br />{/if}
    </div>
    <div class="current">
      {#each lines[$current].split('') as letter, key}
        <span
          class={$value.length > key ? (correct(letter, key) ? 'correct' : 'incorrect') : ''}>{letter}</span>
      {/each}
    </div>
  </div>
  <input
    type="text"
    class="input"
    placeholder="Start typing..."
    bind:this={ref}
    on:keydown={handleKeyDown}
    on:input={handleInput}
    bind:value={$value} />
</div>
