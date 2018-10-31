<template>
  <div>
    <ul>
      <li 
        v-for="post in posts" 
        :key="post.sys.id">
        <Post :post="post.fields" />
      </li>
    </ul>
  </div>
</template>

<script>
import { createClient } from '~/plugins/contentful.js'
import Post from '~/components/Post'

const client = createClient()

export default {
  components: { Post },
  async asyncData() {
    const posts = await client.getEntries({
      content_type: 'post',
      order: '-fields.createdAt'
    })

    return {
      posts: posts.items
    }
  }
}
</script>
