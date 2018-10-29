<template>
  <nuxt-link :to="path">
    {{ meetup.title }}
  </nuxt-link>
</template>

<script>
export default {
  props: {
    meetup: {
      type: Object,
      required: true
    }
  },
  computed: {
    path() {
      return `/meetup/${this.meetup.number}`
    }
  }
}
</script>

<style lang="scss" module>
.wrapper {
  width: 240px;
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
}

.logo {
  width: 190px;
  padding-top: 1rem;
}

.text {
  font-size: $x-small-font-size;
  font-weight: bolder;
}
</style>
