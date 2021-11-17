<template>
  <div class="text-center" v-if="!spell">
    <h3 class="text-dark lighten-50">No active Spell</h3>
  </div>
  <div class="w-75 bg-white elevation-1 p-3 d-flex flex-column" v-else>
    <div class="text-center">
      <h3>{{ spell.name }}</h3>
      <p>
        <b>Range:</b>
        {{ spell.range }} |
        <b>Duration:</b>
        {{ spell.duration }} |
        <b>Level:</b>
        {{ spell.level }}
      </p>
      <p>
        <b>Components:</b>
        {{ spell.components.join(", ") }}
      </p>
    </div>
    <p class="description">{{ spell.description }}</p>
    <div class="d-flex justify-content-between justify-self-end mt-auto">
      <div v-if="spell.id">
        <input
          type="checkbox"
          name="prepared"
          id="prepared"
          @click="prepareToggle"
          v-model="spell.prepared"
        />
        <label for="prepared">Prepared</label>
      </div>
      <div>
        <button class="btn btn-success" v-if="spell.index" @click="addSpell">
          add
        </button>
        <button class="btn btn-danger" v-else @click="removeSpell">
          remove
        </button>
      </div>
    </div>
  </div>
</template>


<script>
import { computed } from "@vue/reactivity"
import { AppState } from "../AppState"
import { logger } from '../utils/Logger'
import Pop from '../utils/Pop'
import { mySpellService } from '../services/MySpellService'


export default {
  setup() {
    return {
      spell: computed(() => AppState.activeSpell),
      async prepareToggle() {
        try {
          await mySpellService.prepareToggle()
          Pop.toast("Prepared", 'success')
        } catch (error) {
          logger.error(error)
          Pop.toast('Something went wrong', 'error')
        }
      },
      async addSpell() {
        try {
          await mySpellService.addSpell()
          Pop.toast("Added", 'success')
        } catch (error) {
          logger.error(error)
          Pop.toast('Something went wrong', 'error')
        }
      },
      async removeSpell() {
        try {
          await mySpellService.removeSpell()
          Pop.toast("Removed", 'success')
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
</style>