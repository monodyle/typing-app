<script>
  import { time, formatter } from "../stores/time"
</script>

<style lang="postcss">
  .contain {
    @apply flex h-12 items-center justify-between;
  }
  .logo {
    @apply inline-block transform -rotate-3 relative text-xl;
  }
  .logo span {
    position: relative;
  }
  .logo::before {
    content: "";
    @apply block absolute border-yellow-200 w-full transform rotate-2;
    bottom: -2px;
    border-top-width: 6px;
  }
  .menu {
    @apply flex;
  }
  .menu .item {
    @apply inline-block mx-4 text-sm;
  }
  .menu a {
    @apply border-b border-dashed border-gray-700;
  }
</style>

<div class="contain">
  <h1 class="logo"><span>typings-app</span></h1>
  <div class="menu">
    <span class="item">{formatter.format($time)}</span>
    <a href="#settings" class="item">settings</a>
  </div>
</div>
