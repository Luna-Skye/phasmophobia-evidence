<template>
<div id="settings">
  <q-btn
    icon="settings"
    round flat
  >
    <q-popup-proxy
      anchor="bottom right"
      self="top right"
      content-style="max-width: 320px;"
    >
      <q-list bordered padding class="bg-mono-2 non-selectable">
        <q-item-label header>App Settings</q-item-label>

        <!-- SHOW EVIDENCE HINTS -->
        <q-item tag="label" v-ripple>
          <q-item-section side top>
            <q-checkbox
              v-model="$store.state.settings.showEvidenceHints"
              @input="$store.dispatch('saveSettings')"
              color="positive"
            />
          </q-item-section>

          <q-item-section>
            <q-item-label>Show Evidence Hints</q-item-label>
            <q-item-label caption>Display tips underneath items in the Evidence List</q-item-label>
          </q-item-section>
        </q-item>
        <!-- HIDE RULED OUT -->
        <q-item tag="label" v-ripple>
          <q-item-section side top>
            <q-checkbox
              v-model="$store.state.settings.hideRuledOut"
              @input="$store.dispatch('saveSettings')"
              color="positive"
            />
          </q-item-section>

          <q-item-section>
            <q-item-label>Hide Ruled Out Ghosts</q-item-label>
            <q-item-label caption>Only displays Ghost Types that are possible, hides the rest</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-popup-proxy>
  </q-btn>
</div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  name: 'Settings'
})
</script>
