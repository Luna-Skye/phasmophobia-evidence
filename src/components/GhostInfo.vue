<template>
<div id="ghost-list">
  <div class="row items-center">
    <h5 class="q-mb-sm q-mt-sm col">{{ $store.state.ghosts[ghostID].name }} Info</h5>
    <Settings />
  </div>
  <p class="text-grey-5">{{ $store.state.ghosts[ghostID].desc }}</p>

  <h6 class="q-mb-none q-mt-none">Strength</h6>
  <p class="text-grey-5">{{ $store.state.ghosts[ghostID].strength }}</p>

  <h6 class="q-mb-none q-mt-none">Weakness</h6>
  <p class="text-grey-5">{{ $store.state.ghosts[ghostID].weakness }}</p>
</div>
</template>

<script lang="ts">
import Vue from 'vue'
import Settings from '@/components/Settings.vue'
export default Vue.extend({
  name: 'GhostInfo',
  components: { Settings },
  props: {
    ghostID: {
      type: Number,
      required: true
    }
  }
})
</script>
