<script lang="ts">
  import Header from "./components/header.svelte"
  import Result from "./components/result.svelte"
  import Stats from "./components/stats.svelte"
  import Typing from "./components/typing.svelte"
  import { finished } from "./stores/typing"
</script>

<style lang="postcss">
  section {
    @apply py-12;
    height: calc(100vh - 6rem);
  }
  .entry {
    @apply max-w-4xl w-full m-auto;
  }
</style>

<div class="p-6">
  <Header />
  <section>
    <div class="entry">
      <Stats />
      {#if !$finished}
        <Typing />
      {:else}
        <Result />
      {/if}
    </div>
  </section>
</div>
