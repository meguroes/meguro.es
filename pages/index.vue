<template>
  <div>
    <div :class="$style.hero">
      <h1 :class="$style.heroText">
        <span>Meguro.es は、目黒周辺で行う</span><br >
        <span>フロントエンド開発者のための勉強会です。</span>
      </h1>
      <img
        :class="$style.heroImage"
        alt="meguro.risu"
        src="~/assets/images/logo/with_text.png"
      >
    </div>
    <p>
      Meguro.es では、二ヶ月に一度フロントエンド開発者を対象にした勉強会(ミートアップ)を行っています。このサイトでは、過去のミートアップの情報や、運営に関する情報をお知らせします。
    </p>
    <h2>記事一覧</h2>
    <ul :class="$style.list">
      <li
        v-for="post in posts"
        :key="post.sys.id">
        <Post :post="post.fields" />
      </li>
    </ul>
    <h2>ミートアップ一覧</h2>
    <ul :class="$style.list">
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
  max-width: 50vw;
  max-height: 60vh;
  margin: 0 auto;
}

.list {
  margin: 0;
  padding: 0;
  list-style-type: none;
}
</style>
