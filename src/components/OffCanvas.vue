<template>
  <div class="offcanvas offcanvas-end" tabindex="-1">
    <div class="offcanvas-header">
      <h5 class="offcanvas-title">{{ title }}</h5>
      <button
        type="button"
        class="btn-close text-reset"
        data-bs-dismiss="offcanvas"
        aria-label="Close"
      ></button>
    </div>
    <div class="offcanvas-body">
      <slot></slot>
    </div>
  </div>
</template>


<script>
export default {
  props: {
    title: {
      type: String,
      required: true
    }
  },
  setup() {
    return {}
  }
}
</script>


<style lang="scss" scoped>
</style>