<template>
  <div :class="$style.wrapper">
    <nuxt-link to="/"><img
      :class="$style.logo"
      src="~/assets/images/logo/text.png"
      alt="Meguro.es">
    </nuxt-link>
    <span :class="$style.text">目黒周辺のFront-end meetup.</span>
  </div>
</template>

<script>
export default {}
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
