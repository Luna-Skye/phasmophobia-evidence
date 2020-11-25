<template>
<q-layout view="hHh Lpr lff">
  <!-- GITHUB BADGE -->
  <GitHubBadge />

  <!-- MOBILE TOP BUFFER -->
  <div class="q-pt-xl lt-md" />
  <div class="q-pt-xl lt-md" />

  <!-- PAGE CONTENTS -->
  <q-page-container class="q-pl-sm q-pr-sm">
    <router-view class="q-pb-lg" />
  </q-page-container>
</q-layout>
</template>

<script>
import GitHubBadge from '@/components/GitHubBadge.vue'
export default {
  name: 'App',
  components: { GitHubBadge },
  created () {
    // Set Quasar to Dark Mode
    this.$q.dark.set(true)

    // Get LocalStorage Values
    this.$store.commit(
      'getSettings',
      this.$q.localStorage.getItem('settings')
    )
  }
}
</script>
