import Vue from 'vue'
import Vuex from 'vuex'
import { LocalStorage } from 'quasar'
Vue.use(Vuex)

//* ------------------------------------------------------- *//
//* INTERFACE DECLARATIONS -------------------------------- *//
export interface EvidenceType {
  name: string;
  caption: string;
  state?: number;
}
export interface GhostType {
  name: string;
  desc: string;
  strength: string;
  weakness: string;
  evidence: string[];
  state: number;
}

//* ------------------------------------------------------- *//
//* STORE STATE ------------------------------------------- *//
// TODO --------------------------------------------------- *//
// Switch Evidence/Ghost State Types to Number Enum
export default new Vuex.Store({
  state: {
    appInfo: {
      version: '1.0.1',
      repo: 'https://github.com/Sepshun/phasmophobia-evidence'
    },

    selectedGhost: 0,
    evidence: [
      {
        name: 'EMF Level 5',
        caption: 'Reading of Level 5 on EMF Detector',
        state: 0
      }, {
        name: 'Spirit Box',
        caption: 'Verbal responses from the Spirit Box',
        state: 0
      }, {
        name: 'Fingerprints',
        caption: 'Visible Hand/Thumb Prints on Doors, Lightswitches, or Windows',
        state: 0
      }, {
        name: 'Ghost Orbs',
        caption: 'Visible floating orbs seen through camera with night vision',
        state: 0
      }, {
        name: 'Ghost Writing',
        caption: 'Writing in Ghost Writing book, c\'mon',
        state: 0
      }, {
        name: 'Freezing Temperature',
        caption: 'Visible breath within room, or temperatures below 0°C/32°F',
        state: 0
      }
    ] as EvidenceType[],
    ghosts: [
      {
        name: 'Spirit',
        desc: 'One of the most common and basic of ghost types, not having much in the ways of behavioural patterns, it\'s best to rely on evidence and not behaviour, known to be fairly passive.',
        strength: 'Nothing.',
        weakness: 'Smudge Sticks will stop it from attacking for long periods of time (180s).',
        evidence: ['Spirit Box', 'Fingerprints', 'Ghost Writing']
      }, {
        name: 'Wraith',
        desc: 'They are some of the most dangerous ghosts you will find. They are the only ghosts who can travel through walls and has the ability of flight.',
        strength: 'Wraiths almost never touch the ground, making it difficult to track their footsteps.',
        weakness: 'They have a toxic reaction to salt.',
        evidence: ['Spirit Box', 'Fingerprints', 'Freezing Temperature']
      }, {
        name: 'Phantom',
        desc: 'A Phantom can possess the living, and most commonly summoned through an Ouija Board. They induce fear into those who see it.',
        strength: 'If you look at a Phantom directly your sanity will drop faster.',
        weakness: 'Taking a photo of a Phantom will cause it to disappear.',
        evidence: ['Freezing Temperature', 'EMF Level 5', 'Ghost Orbs']
      }, {
        name: 'Poltergeist',
        desc: 'It\'s the famous one. Loves interacting with everything and touches all the objects.',
        strength: 'Can yeet multiple objects at once.',
        weakness: 'Ineffective in an empty room, can\'t yeet.',
        evidence: ['Spirit Box', 'Fingerprints', 'Ghost Orbs']
      }, {
        name: 'Banshee',
        desc: 'Natural hunters who stalk their prey one at a time, usually a more active ghost that can become aggressive easily.',
        strength: 'They will only target one person at a time',
        weakness: 'Becomes less aggressive when near a Crucifix.',
        evidence: ['Fingerprints', 'Freezing Temperature', 'EMF Level 5']
      }, {
        name: 'Jinn',
        desc: 'Extremely territorial ghosts that travel very quickly. They very much enjoy messing with anything electronic.',
        strength: 'Will travel faster when their victim is far away.',
        weakness: 'Turning off the location\'s fuse box will prevent the Jinn from using it\'s ability.',
        evidence: ['Spirit Box', 'EMF Level 5', 'Ghost Orbs']
      }, {
        name: 'Mare',
        desc: 'They like the dark, it\'s their comfy place. They are most powerful in the dark, like that one quiet kid in school. Candles are suggested.',
        strength: 'Increased chance to attack in the dark.',
        weakness: 'Believe it or not, less chance to attack in the light.',
        evidence: ['Spirit Box', 'Freezing Temperature', 'Ghost Orbs']
      }, {
        name: 'Revenant',
        desc: 'A violent ghost that can attack indiscriminately, speed will vary depending on hunting or if you\'re hiding.',
        strength: 'A Revenant will move faster during a hunt if their target is within line of sight.',
        weakness: 'They will move slower during a hunt if their target is hiding.',
        evidence: ['Fingerprints', 'Ghost Writing', 'EMF Level 5']
      }, {
        name: 'Shade',
        desc: 'Known as a shy Ghost, but only early in the investigation. They\'re known to get active and aggressive once found and later into investigations. Will be more active if no one is around.',
        strength: 'Being shy through early investigation makes these ghosts difficult to locate.',
        weakness: 'Shouldn\'t enter hunting mode if multiple people are nearby, but "nearby" doesn\'t seem to mean what I think it does.',
        evidence: ['Ghost Writing', 'EMF Level 5', 'Ghost Orbs']
      }, {
        name: 'Demon',
        desc: 'Very aggressive ghosts that will attack relentlessly and without reason. Always keep a good hiding place and crucifixes handy.',
        strength: 'They will attack more often than any other ghost.',
        weakness: 'Asking a Demon successful questions on the Ouija board will not lower sanity.',
        evidence: ['Spirit Box', 'Ghost Writing', 'Freezing Temperature']
      }, {
        name: 'Yurei',
        desc: 'Rumoured to wander frequently. A very dangerous ghost due to sanity drain, keep track of that and your sanity pill stash.',
        strength: 'Drain people\'s sanity quickly.',
        weakness: 'Smudging a Yurei\'s room will cause them to not wander around the location for a while.',
        evidence: ['Ghost Writing', 'Freezing Temperature', 'Ghost Orbs']
      }, {
        name: 'Oni',
        desc: 'Almost equally as aggressive as a Demon, however they are much less active when player\'s leave their location, so keep an eye on Total Activity.',
        strength: 'Oni\'s are more active when people are nearby and have been known to yeet objects at great speed.',
        weakness: 'Due to their activity around people, they\'re easier to find early in the investigation.',
        evidence: ['Spirit Box', 'Ghost Writing', 'EMF Level 5']
      }
    ] as GhostType[],

    settings: {
      showEvidenceHints: false,
      hideRuledOut: false
    }
  },
  getters: {
    evidence (state, getters) {
      //* Initialize Result EvidenceType Array
      const res: EvidenceType[] = state.evidence

      //* Loop through all EvidenceTypes
      state.evidence.forEach((evidence: EvidenceType, e: number) => {
        let isPossible = false

        //* Loop through all confirmed GhostTypes
        getters.ghosts
          .filter((ghost: GhostType) => ghost.state === 1)
          .forEach((ghost: GhostType) => {
            if (ghost.evidence.includes(evidence.name)) isPossible = true
          })

        // TODO | Implement disabled state value again
        if (
          !isPossible &&
          evidence.state === 0 &&
          state.evidence.some(e => e.state === 1)
        ) res[e].state = 3
        else if (isPossible && res[e].state === 3) res[e].state = 0
      })

      //* Return Result Array
      return res
    },
    ghosts (state) {
      //* Initialize Result GhostType Array
      const res: GhostType[] = state.ghosts

      //* Loop through all GhostTypes
      state.ghosts.forEach((ghost: GhostType, g: number) => {
        //* Initialize Default Values
        // We make sure that by default, Ghosts are confirmed/possible
        // Through process of elimination we cut them out of the possibilities
        let isConfirmed = true
        let isRuledOut = false

        //* Check if ANY evidence has been checked
        // This is used to make sure not all ghosts are marked
        // as confirmed if no evidence has been confirmed
        const isAnyConfirmed = state.evidence.some(e => e.state === 1 || e.state === 2)

        //* Loop through all EvidenceTypes
        state.evidence.forEach((evidence: EvidenceType) => {
          //* If Ghost has NO confirmed Evidence
          // If the Ghost doesn't have evidence that's been confirmed
          // then it can't be that ghost type, so we set isConfirmed to false
          if (
            evidence.state === 1 &&
            !ghost.evidence.includes(evidence.name)
          ) isConfirmed = false

          //* If Ghost HAS ruled out Evidence
          // If the Ghost DOES have evidence that has been hard ruled out
          // then chances are it isn't that ghost and we set isRuledOut to true
          else if (
            evidence.state === 2 &&
            ghost.evidence.includes(evidence.name)
          ) isRuledOut = true
        })

        //* Update ghost.state depending on boolean conditionals
        if (isRuledOut) res[g].state = 2
        else if (isConfirmed && isAnyConfirmed) res[g].state = 1
        else res[g].state = 0
      })

      //* Return Result Array
      return res
    }
  },
  mutations: {
    clearEvidence (state) { state.evidence.forEach(e => { e.state = 0 }) },
    getSettings (state, payload) { if (payload) state.settings = payload }
  },
  actions: {
    saveSettings ({ state }) { LocalStorage.set('settings', state.settings) }
  }
})
