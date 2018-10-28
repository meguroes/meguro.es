<template>
  <div 
    v-if="loading" 
    :class="$style.loading">Loading</div>
</template>

<script>
export default {
  data: () => ({
    loading: false
  }),
  methods: {
    start() {
      this.loading = true
    },
    finish() {
      this.loading = false
    }
  }
}
</script>

<style module>
.loading {
  display: fixed;
  top: 50%;
  left: 50%;
  width: 200px;
  height: 200px;
}
</style>
