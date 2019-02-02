<template>
  <div>
    <section v-html="markdownedBody"/>
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
        'fields.name': 'guideline-example',
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
