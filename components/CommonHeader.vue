<template>
  <div :class="$style.wrapper">
    <div :class="$style.logoBox">
      <nuxt-link to="/"><img
        :class="$style.logo"
        src="~/assets/images/logo/text.png"
        alt="Meguro.es">
      </nuxt-link>
      <span :class="$style.text">目黒周辺のFront-end meetup.</span>
    </div>
    <nav :class="$style.globalMenu">
      <nuxt-link to="/about">Meguro.esとは</nuxt-link>
      <nuxt-link to="/meetup">イベント</nuxt-link>
      <nuxt-link to="/posts">記事</nuxt-link>
    </nav>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss" module>
.wrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logoBox {
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
  padding: 0 1rem;
}

.globalMenu {
  padding: 0 1rem;
  > a {
    @media screen and (max-width: 959px) {
      &:not(:first-of-type) {
        display: none;
      }
      font-size: $tiny-font-size;
      margin: 0rem;
      padding: 0.1rem;
    }
    display: inline;
    font-size: $small-font-size;
    font-weight: bolder;
    background: $PRIMARY_COLOR;
    color: $BASE_FONT_COLOR;
    text-decoration: none;
    margin: 0.25rem;
    padding: 0.5rem;
    border-radius: 0.2rem;
    transition: 0.25s background ease-in;

    &:hover {
      background: $PRIMARY_LIGHTEN_1_COLOR;
    }
    &:active {
      background: $PRIMARY_LIGHTEN_2_COLOR;
    }
  }
}

.logo {
  width: 190px;
  padding-top: 1rem;
}

.text {
  line-height: 0.2;
  font-size: $x-small-font-size;
  font-weight: bolder;
  @media screen and (max-width: 959px) {
    font-size: $tiny-font-size;
  }
}
</style>
