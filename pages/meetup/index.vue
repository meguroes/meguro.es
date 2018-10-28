<template>
  <div>
    <ul>
      <li 
        v-for="meetup in meetups" 
        :key="meetup.sys.id">
        {{ meetup.fields }}
      </li>
    </ul>
  </div>
</template>

<script>
import { createClient } from '~/plugins/contentful.js'

const client = createClient()

export default {
  async asyncData() {
    const meetups = await client.getEntries({
      content_type: 'meetup'
    })

    return {
      meetups: meetups.items
    }
  }
}
</script>
