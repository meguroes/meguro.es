<template>
  <div>
    <div 
      :class="$style.post" 
      v-html="markdownedBody"/>
    <div 
      v-for="meetup in post.fields.meetups"
      :key="meetup.sys.id">
      <Meetup :meetup="meetup.fields" />
    </div>
  </div>
</template>

<script>
import { createClient } from '~/plugins/contentful.js'
import Meetup from '~/components/Meetup'

const MarkdownIt = require('markdown-it')('commonmark')

const client = createClient()

export default {
  head() {
    return {
      title: `${this.post.fields.title} | Meguro.es`,
      meta: [
        {
          hid: 'og:title',
          name: 'og:title',
          property: 'og:title',
          content: `${this.post.fields.title} | 目黒周辺のFront-end meetup.`
        },
        {
          hid: 'og:description',
          name: 'og:description',
          property: 'og:description',
          content:
            this.post.fields.description ||
            'Meguro.es は 目黒(区|駅)周辺で2か月に1回行われるフロントエンド開発者のMeetup(勉強会)です。' +
              '目黒周辺にお住まいの方・お勤めの方はもちろんのこと、フロントエンドに興味がある方はどなたでも参加大歓迎です'
        },
        {
          hid: 'description',
          name: 'description',
          content:
            this.post.fields.description ||
            'Meguro.es は 目黒(区|駅)周辺で2か月に1回行われるフロントエンド開発者のMeetup(勉強会)です。' +
              '目黒周辺にお住まいの方・お勤めの方はもちろんのこと、フロントエンドに興味がある方はどなたでも参加大歓迎です'
        }
      ]
    }
  },
  components: { Meetup },
  computed: {
    markdownedBody() {
      return MarkdownIt.render(this.post.fields.body)
    }
  },
  created() {
    setTimeout(() => {
      try {
        twttr.widgets.load()
      } catch (e) {
        console.error(e)
      }
    }, 20)
  },
  async asyncData({ params, error, payload }) {
    if (payload) {
      return {
        post: payload
      }
    }

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

<style lang="scss" module>
.post {
  img {
    max-width: 100%;
  }
}
</style>
