<script lang="ts">
  import Footer from "./components/footer.svelte"
  import Header from "./components/header.svelte"
  import Result from "./components/result.svelte"
  import Stats from "./components/stats.svelte"
  import Typing from "./components/typing.svelte"
  import { finished } from "./stores/typing"
</script>

<style lang="postcss">
  main {
    @apply p-6 flex flex-col;
    height: 100vh;
  }
  section {
    @apply py-12 h-full;
  }
  .entry {
    @apply max-w-4xl w-full m-auto pt-16;
  }
</style>

<main>
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
  <Footer />
</main>
