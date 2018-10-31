<template>
  <div :class="$style.wrapper">
    <CommonHeader />
    <div :class="$style.inner">
      <nuxt/>
    </div>
    <footer :class="$style.footer">
      <small>&copy; Meguro.es</small>
    </footer>
  </div>
</template>

<script>
import CommonHeader from '~/components/CommonHeader'

export default {
  components: { CommonHeader }
}
</script>

<style lang="scss" module>
.wrapper {
  background: $BASE_BACKGROUND_COLOR;
  margin: 0 auto;
  width: calc(100% - 48px);
  min-height: 100vh;
  box-shadow: 0.25rem 0.25rem 1rem $PRIMARY_DARKEN_1_COLOR;

  @media screen and (min-width: 960px) {
    width: calc(100% - 10%);
  }
}

.inner {
  padding: 1rem;
  @media screen and (min-width: 960px) {
    padding: 1rem 10%;
  }
}

.footer {
  margin-top: 2rem;
  margin-bottom: 0.5rem;
  text-align: center;
}
</style>
