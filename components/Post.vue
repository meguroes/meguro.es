<template>
  <nuxt-link :to="path">
    {{ post.title }}
  </nuxt-link>
</template>

<script>
export default {
  props: {
    post: {
      type: Object,
      required: true
    }
  },
  computed: {
    path() {
      return `/posts/${this.post.slug}`
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
