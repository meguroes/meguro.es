<template>
  <div>
    <h1>第{{ meetup.fields.number }}回の開催概要</h1>
    <h2>開催日時</h2>
    {{ meetup.fields.date }}
    <h2>開催場所</h2>
    {{ meetup.fields.locationName }}
    <h2 v-if="posts.length">関連投稿</h2>
    <div
      v-for="post in posts"
      :key="post.id"
    >
      <Post :post="post.fields" />
    </div>
  </div>
</template>

<script>
import { createClient } from '~/plugins/contentful.js'
import Post from '~/components/Post.vue'

const client = createClient()

export default {
  head() {
    return {
      title: `${this.meetup.fields.title} | Meguro.es`,
      meta: [
        {
          hid: 'og:title',
          name: 'og:title',
          content: `${this.meetup.fields.title} | 目黒周辺のFront-end meetup.`
        },
        {
          hid: 'og:description',
          name: 'og:description',
          content:
            'Meguro.es は 目黒(区|駅)周辺で2か月に1回行われるフロントエンド開発者のMeetup(勉強会)です。' +
            '目黒周辺にお住まいの方・お勤めの方はもちろんのこと、フロントエンドに興味がある方はどなたでも参加大歓迎です'
        }
      ]
    }
  },
  components: {
    Post
  },
  async asyncData({ params, error, payload }) {
    if (payload) {
      return {
        meetup: payload
      }
    }
    const meetups = await client.getEntries({
      content_type: 'meetup',
      'fields.number': params.number
    })

    const posts = await client.getEntries({
      content_type: 'post',
      'fields.meetups.sys.id': meetups.items[0].sys.id
    })

    if (!meetups.total) {
      error({ statusCode: 404, message: 'ページが見つかりません' })
    }

    return {
      meetup: meetups.items[0],
      posts: posts.items
    }
  },
  validate({ params }) {
    return /^[0-9]+$/.test(params.number)
  }
}
</script>
