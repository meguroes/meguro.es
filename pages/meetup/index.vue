<template>
  <div>
    <h1>イベント一覧</h1>
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

<style lang="scss" module>
.list {
  list-style-type: none;
  padding: 0;
  margin: 0;
}
</style>
