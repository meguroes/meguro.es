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
      title: `${this.meetup.fields.title} | Meguro.es`
    }
  },
  async asyncData({ params, error }) {
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
