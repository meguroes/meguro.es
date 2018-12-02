<template>
  <div>
    <h1>第{{ meetup.fields.number }}回の開催概要</h1>
    <h2>開催日時</h2>
    {{ meetup.fields.date }}
    <h2>開催場所</h2>
    {{ meetup.fields.locationName }}

  </div>
</template>

<script>
import { createClient } from '~/plugins/contentful.js'

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

    if (!meetups.total) {
      error({ statusCode: 404, message: 'ページが見つかりません' })
    }

    return {
      meetup: meetups.items[0]
    }
  },
  validate({ params }) {
    return /^[0-9]+$/.test(params.number)
  }
}
</script>
