<template>
  <div>
    <div v-html="markdownedBody"/>
</div></template>

<script>
import { createClient } from '~/plugins/contentful.js'
const MarkdownIt = require('markdown-it')('commonmark')

const client = createClient()

export default {
  head() {
    return {
      title: `${this.post.fields.title} | Meguro.es`
    }
  },
  computed: {
    markdownedBody() {
      return MarkdownIt.render(this.post.fields.body)
    }
  },
  async asyncData({ params, error }) {
    const posts = await client.getEntries({
      content_type: 'post',
      'fields.slug': params.slug
    })

    if (!posts.total) {
      error({ statusCode: 404, message: 'ページが見つかりません' })
    }

    return {
      post: posts.items[0]
    }
  },
  validate({ params }) {
    return /^[-a-z0-9]+$/.test(params.slug)
  }
}
</script>
