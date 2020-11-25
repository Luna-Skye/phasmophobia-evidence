<template>
<q-page class="row flex justify-center items-start">
  <div id="home" class="col-12 col-lg-9 col-md-10 col-sm-12">
    <div class="row flex">
      <!-- EVIDENCE LIST -->
      <EvidenceList
        v-model="$store.state.evidence"
        class="col-xs-12 col-sm-12 col-md-4 col-lg-3 q-mr-sm q-mb-sm"
      />

      <!-- SELECTED GHOST INFO -->
      <GhostInfo
        :ghostID="$store.state.selectedGhost"
        class="col col-xs-12 col-sm-12 col-md"
      />
    </div>

    <!-- GHOST LIST -->
    <GhostList v-model="$store.state.selectedGhost" />

    <q-menu
      no-parent-event
      persistent
      fit
      anchor="bottom middle"
      self="bottom middle"
      :offset="[0, 8]"
      ref="surveyBanner"
    >
      <q-banner class="bg-positive text-black p-mt-xl">
        Care to give me feedback and advice on this tool and future updates to it?
        <template v-slot:action>
          <q-btn
            flat
            color="black"
            label="Dismiss"
            @click="dismissSurvey"
          />
          <a
            href="https://forms.gle/kdXw4yd1g4GR31cR9"
            target="_blank"
            @click="dismissSurvey"
          >
            <q-btn flat color="black" label="Take Quick Survey" />
          </a>
        </template>
      </q-banner>
    </q-menu>
  </div>
</q-page>
</template>

<script lang="ts">
//* ------------------------------------------------------- *//
//* IMPORT COMPONENTS ------------------------------------- *//
import Vue from 'vue'
import title from '@/mixins/title'

import EvidenceList from '@/components/EvidenceList.vue'
import GhostInfo from '@/components/GhostInfo.vue'
import GhostList from '@/components/GhostList.vue'
import { QMenu } from 'quasar'

//* ------------------------------------------------------- *//
//* COMPONENT REGISTRATION -------------------------------- *//
export default Vue.extend({
  name: 'Home',
  title: 'Phasmo - Evidence Tracker',
  components: { EvidenceList, GhostInfo, GhostList },
  mixins: [title],
  methods: {
    dismissSurvey () {
      this.$q.localStorage.set('SurveyState', false)
      const banner: QMenu = this.$refs.surveyBanner as QMenu
      banner.hide()
    }
  },
  mounted () {
    if (this.$q.localStorage.getItem('SurveyState') !== false) {
      const banner: QMenu = this.$refs.surveyBanner as QMenu
      banner.show()
    }
  }
})
</script>
