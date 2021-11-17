<template>
  <div class="my-spells-button">
    <div
      class="d-flex bg-danger p-3 mt-2 selectable"
      data-bs-toggle="offcanvas"
      data-bs-target="#my-spellbook-offcanvas"
    >
      <i class="mdi mdi-book text-light"></i>
    </div>

    <OffCanvas title="My Spellbook" id="my-spellbook-offcanvas">
      <div class="pt-4">
        <button
          class="btn btn-primary"
          v-if="sortByLevel"
          @click="sortByLevel = false"
        >
          Sort: A-Z
        </button>
        <button class="btn btn-primary" v-else @click="sortByLevel = true">
          Sort: 1-10
        </button>
        <input id="prepared" type="checkbox" v-model="prepared" />
        <label for="prepared">prepared</label>
        <div v-if="!spells.length">
          <p class="lighten-50 text-dark">No Spells in your book</p>
        </div>
        <div>
          <p
            class="m-0 p-1 selectable"
            v-for="spell in spells"
            :key="spell.id"
            @click="setActive(spell)"
          >
            {{ spell.name }}
          </p>
        </div>
      </div>
    </OffCanvas>
  </div>
</template>


<script>
import { computed, ref } from '@vue/reactivity'
import { AppState } from '../AppState'
import { Offcanvas } from 'bootstrap'
export default {
  setup() {
    const sortByLevel = ref(false)
    const prepared = ref(false)
    return {
      sortByLevel,
      prepared,
      spells: computed(() => {
        let spells = AppState.mySpells
        if (prepared.value) {
          spells = spells.filter(s => s.prepared)
        }
        if (sortByLevel.value) {
          spells = spells.sort((a, b) => {
            return parseInt(a.level) - parseInt(b.level)
          })
        } else {
          spells = spells.sort((a, b) => {
            return (a.name < b.name) ? -1 : (a.name > b.name) ? 1 : 0
          })
        }
        return spells
      }),
      setActive(spell) {
        AppState.activeSpell = spell
        Offcanvas.getOrCreateInstance(document.getElementById('my-spellbook-offcanvas')).toggle()
      }
    }
  }
}
</script>


<style lang="scss" scoped>
.my-spells-button {
  position: absolute;
  right: 0;
}
</style>