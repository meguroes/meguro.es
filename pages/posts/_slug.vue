<template>
  <div>
    {{ post }}
  </div>
</template>

<script>
import { createClient } from '~/plugins/contentful.js'

const client = createClient()

export default {
  head() {
    return {
      title: `${this.post.fields.title} | Meguro.es`
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
    return /^[_a-z0-9]+$/.test(params.slug)
  }
}
</script>
