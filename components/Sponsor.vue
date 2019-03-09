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
      <span :class="$style.category">{{ types.map(type => type.jp).join('・') }}</span>
    </h1>
    <div
      :class="$style.post"
      v-html="markdownedBody"
    />
  </section>
</template>

<script>
const MarkdownIt = require('markdown-it')('commonmark')

const sponsorJP = type => {
  switch (type) {
    case 'venue':
      return '会場提供'
    case 'platinum':
      return '特別スポンサー'
    case 'gold':
      return 'スポンサー'
    case 'drink':
      return 'ドリンクサポート'
    case 'sakura':
      return '個人スポンサー'
    case 'sanma':
      return '個人サポーター'
  }
}

export default {
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
          src: require(`~/assets/images/sponsor/${type}.svg`),
          jp: sponsorJP(type)
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
