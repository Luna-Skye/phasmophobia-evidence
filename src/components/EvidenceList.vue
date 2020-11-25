<template>
<div id="evidence-list">
  <!-- COMPONENT HEADER -->
  <div class="row items-center">
    <h5 class="q-mb-sm q-mt-sm col">Evidence Checklist</h5>

    <!-- CLEAR ALL EVIDENCE BUTTON -->
    <div>
      <q-btn
        icon="clear_all"
        round flat
        :disable="!$store.state.evidence.some(e => e.state !== 0)"
        @click="$store.commit('clearEvidence'); $refs.clearEvidenceTooltip.hide()"
      >
        <q-tooltip
          ref="clearEvidenceTooltip"
          content-class="bg-positive text-dark text-subtitle2"
        >Clear All Evidence</q-tooltip>
      </q-btn>
    </div>
  </div>

  <!-- EVIDENCE LIST -->
  <q-list separator dense>
    <q-item
      v-for="(e, i) in $store.getters.evidence"
      :key="`EvidenceList_${i}`"
      class="q-pa-none non-selectable"
      :class="{
        '--positive': e.state === 1,
        '--negative': e.state === 2
      }"
      :disable="e.state === 3"
    >
      <!-- EVIDENCE NAME -->
      <q-item-section
        class="bg-mono-3"
        :class="{
          'bg-positive-dark text-positive': e.state === 1,
          'bg-negative-dark text-negative': e.state === 2
        }"
      >
        <q-item-label class="text-bold">{{ e.name }}</q-item-label>
        <q-item-label
          v-if="$store.state.settings.showEvidenceHints"
          class="text-grey-6"
          caption
          lines="2"
        >{{ e.caption }}</q-item-label>
      </q-item-section>

      <!-- ITEM ACTION BUTTONS -->
      <q-item-section
        class="q-pl-none"
        avatar
      >
        <div class="row">
          <q-btn
            class="no-border-radius"
            :class="{
              'bg-positive-dark text-positive': e.state === 1,
              'bg-negative-dark text-negative': e.state === 2
            }"
            icon="check"
            round flat
            :disable="e.state === 2 || e.state === 3"
            @click="updateEvidence(i, 1)"
          />
          <q-btn
            class="no-border-radius"
            icon="close"
            :class="{
              'bg-positive-dark text-positive': e.state === 1,
              'bg-negative-dark text-negative': e.state === 2
            }"
            round flat
            :disable="e.state === 1 || e.state === 3"
            @click="updateEvidence(i, 2)"
          />
        </div>
      </q-item-section>
    </q-item>
  </q-list>
</div>
</template>

<script lang="ts">
import Vue from 'vue'
import { EvidenceType } from '@/store'

export default Vue.extend({
  name: 'EvidenceList',
  props: {
    value: {
      required: true
    }
  },
  methods: {
    updateEvidence (id: number, state: number) {
      //* Store Temporary EvidenceType Array
      const res: EvidenceType[] = this.value as EvidenceType[]

      //* Alter EvidenceType in Question
      // Ternary for Toggling
      res[id].state = res[id].state !== state
        ? state
        : 0

      //* Emit Event and Pass Payload
      this.$emit('input', res)
    }
  }
})
</script>

<style lang="scss">
#evidence-list {
  .q-list--dense > .q-item,
  .q-item--dense { padding: 0; }
  .q-item__section--main ~ .q-item__section--side { padding-left: 0; }
  .q-item__section:first-of-type { padding-left: 16px; }
  .q-btn { padding: 2px; }

  .q-item,
  .q-item__section,
  .q-item__section .q-btn {
    transition: 0.15s ease;
  }
}
</style>
