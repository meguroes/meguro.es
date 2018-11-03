<template>
  <div>
    <div 
      :class="$style.post" 
      v-html="markdownedBody"/>
  </div>
</template>

<script>
import { createClient } from '~/plugins/contentful.js'
const client = createClient()
const MarkdownIt = require('markdown-it')('commonmark')

export default {
  computed: {
    markdownedBody() {
      return MarkdownIt.render(this.article.fields.body)
    }
  },
  asyncData() {
    return Promise.all([
      client.getEntries({
        content_type: 'article',
        'fields.name': 'about',
        limit: 1
      })
    ])
      .then(([articles]) => {
        return {
          article: articles.items[0]
        }
      })
      .catch(console.error)
  }
}
</script>

<style lang="scss" module>
.heroText {
  margin-bottom: 0;
  font-size: $huge-font-size;
  font-weight: bolder;
  text-align: center;
  @media screen and (max-width: 959px) {
    font-size: $large-font-size;
  }
}

.heroImage {
  display: block;
  max-width: 55%;
  margin: 0 auto;
}
</style>
