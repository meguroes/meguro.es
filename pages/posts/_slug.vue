<template>
  <div>
    <section
      :class="$style.post"
      v-html="markdownedBody"/>
    <section v-if="sponsors.length">
      <h1>スポンサー</h1>
      <div
        v-for="sponsor in sponsors"
        :key="sponsor.fields.id"
      >
        <Sponsor :sponsor="sponsor.fields" />
      </div>
    </section>
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
import Sponsor from '~/components/Sponsor.vue'

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
      ],
      script: [
        {
          async: 'async',
          src: 'https://speakerdeck.com/assets/embed.js',
          charset: 'utf-8'
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

    const sponsors = await client.getEntries({
      content_type: 'sponsor',
      'fields.meetup.sys.id': posts.items[0].sys.id
    })

    return {
      post: posts.items[0],
      sponsors: sponsors.items
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
