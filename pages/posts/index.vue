<template>
  <div>
    <ul>
      <li 
        v-for="post in posts" 
        :key="post.sys.id">
        {{ post.fields }}
      </li>
    </ul>
  </div>
</template>

<script>
import { createClient } from '~/plugins/contentful.js'

const client = createClient()

export default {
  async asyncData() {
    const posts = await client.getEntries({
      content_type: 'post'
    })

    return {
      posts: posts.items
    }
  }
}
</script>
