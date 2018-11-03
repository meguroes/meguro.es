<template>
  <div>
    <h1>記事一覧</h1>
    <ul :class="$style.list">
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

<style lang="scss" module>
.list {
  list-style-type: none;
  padding: 0;
  margin: 0;
}
</style>
