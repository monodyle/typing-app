<script>
  import { timer } from "../stores/result"
  import { reset } from "../utils"
</script>

<div>Tooked {$timer / 1000}s!</div>

<button on:click={() => reset()}>reset</button>
