<template>
  <div>
    <div :class="$style.hero">
      <p :class="$style.heroText">
        <span>Meguro.es は、目黒周辺で行う</span><br >
        <span>フロントエンド開発者のための勉強会です。</span>
      </p>
      <img 
        :class="$style.heroImage" 
        src="~/assets/images/logo/with_text.png"
      >
    </div>
    <ul>
      <li 
        v-for="post in posts" 
        :key="post.sys.id">
        <Post :post="post.fields" />
      </li>
    </ul>
    <ul>
      <li 
        v-for="meetup in meetups" 
        :key="meetup.sys.id">
        <Meetup :meetup="meetup.fields" />
      </li>
    </ul>
  </div>
</template>

<script>
import { createClient } from '~/plugins/contentful.js'
import Post from '~/components/Post'
import Meetup from '~/components/Meetup'

const client = createClient()

export default {
  components: { Post, Meetup },
  asyncData() {
    return Promise.all([
      client.getEntries({
        content_type: 'post',
        order: '-fields.createdAt',
        limit: 10
      }),
      client.getEntries({
        content_type: 'meetup',
        order: '-fields.date',
        limit: 10
      })
    ])
      .then(([posts, meetups]) => {
        return {
          posts: posts.items,
          meetups: meetups.items
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
