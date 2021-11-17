import { computed } from '@vue/reactivity'
import { reactive } from 'vue'

// NOTE AppState is a reactive object to contain app level data
export const AppState = reactive({
  user: {},
  account: {},
  dndApiSpells: [],
  /** @type {Spell} */
  activeSpell: null,
  mySpells: []
})


export const getters = {
  apiSpells: computed(() => {

    return apiSpells
  })
}