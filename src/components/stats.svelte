<script>
  import { result, getResult } from "../stores/result"
  import { finished, start } from "../stores/typing"

  const interval = setInterval(() => {
    if (!$finished && $start) {
      getResult()
    }
  }, 1000)

  if ($finished) clearInterval(interval)
</script>

<style lang="postcss">
  .contain {
    @apply flex mb-4;
  }
  .item {
    @apply pr-4 mr-4;
  }
  .name {
    @apply text-xs;
  }
  .stat {
    @apply font-medium;
  }
</style>

<div class="contain">
  <div class="item">
    <span class="name">WPM</span>
    <div class="stat">{$result.wpm}</div>
  </div>
  <div class="item">
    <span class="name">CPM</span>
    <div class="stat">{$result.cpm}</div>
  </div>
  <div class="item">
    <span class="name">ACC</span>
    <div class="stat">{$result.acc}</div>
  </div>
</div>
