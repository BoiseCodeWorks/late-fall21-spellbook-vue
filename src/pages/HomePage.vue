<template>
  <div class="home flex-grow-1 container-fluid">
    <MySpells v-if="account.id" />
    <div class="row">
      <div class="col-md-3">
        <DndApiSpells />
      </div>
      <div class="col-md-9 pt-5 d-flex justify-content-center">
        <ActiveSpell />
      </div>
    </div>
  </div>
</template>

<script>
import { computed, onMounted } from "@vue/runtime-core"
import { dnDApiService } from "../services/DnDApiService"
import { AppState } from '../AppState'

export default {
  name: 'Home',

  setup(props) {
    onMounted(() => {
      dnDApiService.getDndApiSpells()
    })
    return {
      account: computed(()=> AppState.account)
    }
  }
}
</script>

<style scoped lang="scss">
</style>
