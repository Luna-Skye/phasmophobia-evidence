<template>
<div class="github-badge">
  <a class="badge column items-center bg-positive" :href="$store.state.appInfo.repo" target="_blank">
    <img class="col" src="https://upload.wikimedia.org/wikipedia/commons/9/91/Octicons-mark-github.svg" style="height: 32px;">
    <p class="col q-ma-xs">v{{ $store.state.appInfo.version }}</p>
  </a>
</div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  name: 'GitHubBadge'
})
</script>

<style lang="scss">
@import '@/styles/quasar.variables.scss';
.github-badge {
  position: absolute;
  width: 144px;
  height: 128px;
  top: 0;
  right: 0;
  overflow: hidden;
  z-index: 9999;
  pointer-events: none;

  .badge {
    color: $mono-2;
    text-decoration: none;
    padding-top: 32px;
    transform: translate(54px, -28px) rotate(45deg);
    pointer-events: auto;
  }
}
</style>
