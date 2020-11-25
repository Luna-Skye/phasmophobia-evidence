<template>
<div id="ghost-list">
  <h5 class="q-mb-sm q-mt-sm">Ghost Type List</h5>
  <q-markup-table class="no-box-shadow no-border-radius">
    <tbody>
      <!-- RENDER GHOST LOOP -->
      <template v-for="(ghost, g) in $store.getters.ghosts">
        <tr
          :key="`GhostList_Ghosts_${g}`"
          v-if="
            $store.state.settings.hideRuledOut
              ? $store.state.evidence.some(e => e.state !== 0) ? ghost.state === 1 : true
              : true
          "
          class="non-selectable"
          :class="{
            '--selected': g === value,
            'bg-positive-darker --positive': ghost.state === 1,
            'bg-negative-darker --negative': ghost.state === 2
          }"
        >
          <td
            class="text-bold cursor-pointer bg-mono-3"
            :class="{
              'bg-positive-dark text-positive': ghost.state === 1,
              'bg-negative-dark text-negative': ghost.state === 2
            }"
            @click="$emit('input', g)"
            v-ripple
          >{{ ghost.name }}</td>

          <!-- RENDER EVIDENCE LOOP -->
          <td
            v-for="(evidence, e) in $store.getters.evidence"
            :key="`GhostList_Ghosts_${g}_Evidence_${e}`"
            class="text-center"
            :class="{
              'text-positive': ghost.state !== 0 && $store.getters.evidence.some(ev => ev.state === 1 && ev.name === evidence.name),
              'text-negative': ghost.state !== 0 && $store.getters.evidence.some(ev => ev.state === 2 && ev.name === evidence.name)
            }"
          >
            {{ ghost.evidence.includes(evidence.name) ? evidence.name : '' }}
          </td>
        </tr>
      </template>
    </tbody>
  </q-markup-table>
</div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  name: 'GhostList',
  props: {
    value: {
      type: Number,
      required: true
    }
  }
})
</script>

<style lang="scss">
@import '@/styles/quasar.variables.scss';
#ghost-list {
  tr, tr td { transition: 0.15s ease; }
  tr.--selected td:first-of-type { box-shadow: 4px 0 0 rgba(white, 0.25) inset; }
  tr.--selected.--positive td:first-of-type { box-shadow: 4px 0 0 $positive inset; }
  tr.--selected.--negative td:first-of-type { box-shadow: 4px 0 0 $negative inset; }
}
</style>
