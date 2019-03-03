<template>
  <section :class="$style.inner">
    <h1 :class="$style.h1">
      <img
        v-for="type in types"
        :key="type.title"
        :title="type.title"
        :src="type.src"
        width="24"
        height="24"
      >
      {{ sponsor.name }}様
      <span :class="$style.category">（{{ sponsor.type | sponsorJP }}）</span>
    </h1>
    <div
      :class="$style.post"
      v-html="markdownedBody"
    />
  </section>
</template>

<script>
const MarkdownIt = require('markdown-it')('commonmark')

export default {
  filters: {
    sponsorJP(type) {
      switch (type) {
        case 'Venue_Platinum':
          return '会場提供・特別スポンサー'
        case 'Platinum':
          return '特別スポンサー'
        case 'Venue_Gold':
          return '会場提供・スポンサー'
        case 'Gold':
          return 'スポンサー'
        case 'Venue':
          return '会場提供'
        case 'Sakura':
          return '個人スポンサー'
        case 'Sanma':
          return '個人サポーター'
      }
      return type
    }
  },
  props: {
    sponsor: {
      type: Object,
      required: true
    }
  },
  computed: {
    markdownedBody() {
      return MarkdownIt.render(this.sponsor.message)
    },
    types() {
      return this.sponsor.type
        .toLocaleLowerCase()
        .split('_')
        .map(type => ({
          title: type,
          src: require(`~/assets/images/sponsor/${type}.svg`)
        }))
    }
  }
}
</script>

<style lang="scss" module>
.h1 {
  padding: 0;
  margin: 0;
  font-size: $huge-font-size;

  .category {
    font-size: $normal-font-size;
  }
}
</style>
