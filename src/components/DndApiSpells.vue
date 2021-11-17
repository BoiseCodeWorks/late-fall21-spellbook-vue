<template>
  <div class="api-spells row">
    <div class="col-12 pt-3">
      <h4>Unknown Spells</h4>
      <p
        class="m-0 selectable"
        v-for="spell in spells"
        :key="spell.index"
        @click="setActive(spell.index)"
      >
        {{ spell.name }}
      </p>
    </div>
  </div>
</template>


<script>
import { computed, ref } from '@vue/reactivity'
import { AppState, getters } from '../AppState'
import { dnDApiService } from '../services/DnDApiService'
import { logger } from '../utils/Logger'
import Pop from '../utils/Pop'
export default {
  setup() {
    return {
      spells: computed(() => {
        const myspells = AppState.mySpells
        let apiSpells = []
        AppState.dndApiSpells.forEach(apiSpell => {
          if (!(myspells.find(s => s.name === apiSpell.name))) {
            apiSpells.push(apiSpell)
          }
        })
        logger.log(apiSpells)
        return apiSpells
      }),
      async setActive(index) {
        try {
          await dnDApiService.getDndApiSpellByIndex(index)
        } catch (error) {
          logger.error(error)
          Pop.toast('Something went wrong', 'error')
        }
      }
    }
  }
}
</script>


<style lang="scss" scoped>
.api-spells {
  height: 85vh;
  overflow-y: auto;
  overflow-x: hidden;
}
</style>