<template>
  <div>
    {{ meetup }}
  </div>
</template>

<script>
import { createClient } from '~/plugins/contentful.js'

const client = createClient()

export default {
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
