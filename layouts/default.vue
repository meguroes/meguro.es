<template>
  <div :class="$style.wrapper">
    <CommonHeader />
    <div :class="$style.inner">
      <HotContent />
      <nuxt/>
    </div>
    <footer :class="$style.footer">
      <nav :class="$style.globalMenu">
        <ul>
          <li><nuxt-link to="/about">Meguro.esとは</nuxt-link></li>
          <li><nuxt-link to="/guideline">ガイドライン</nuxt-link></li>
          <li><nuxt-link to="/meetup">イベント</nuxt-link></li>
          <li><nuxt-link to="/posts">記事</nuxt-link></li>
          <li><a href="https://twitter.com/meguroes">Twitter @meguroes</a></li>
      </ul></nav>
      <small>&copy; Meguro.es</small>
    </footer>
  </div>
</template>

<script>
import CommonHeader from '~/components/CommonHeader'
import HotContent from '~/components/HotContent'

export default {
  components: { CommonHeader, HotContent }
}
</script>

<style lang="scss" module>
.wrapper {
  background: $BASE_BACKGROUND_COLOR;
  margin: 0 auto;
  min-height: 100vh;
  box-shadow: 0.25rem 0.25rem 1rem $PRIMARY_DARKEN_1_COLOR;

  width: calc(100vw - 12px);
  @media screen and (min-width: 480px) and (max-width: 959px) {
    width: calc(100vw - 36px);
  }

  @media screen and (min-width: 960px) {
    width: calc(100vw - 10%);
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

.globalMenu {
  font-size: $x-small-font-size;
  > ul {
    list-style-type: none;
    > li {
      display: inline;
      &:not(:last-of-type) {
        &:after {
          content: ' / ';
        }
      }
    }
  }
}
</style>
