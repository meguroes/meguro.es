<template>
  <div>
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
import Meetup from '~/components/Meetup'

const client = createClient()

export default {
  components: { Meetup },
  async asyncData() {
    const meetups = await client.getEntries({
      content_type: 'meetup',
      order: '-fields.date'
    })

    return {
      meetups: meetups.items
    }
  }
}
</script>
