<template>
  <div>
    <ul>
      <li 
        v-for="post in posts" 
        :key="post.sys.id">
        {{ post.fields }}
      </li>
    </ul>
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
  asyncData() {
    return Promise.all([
      client.getEntries({
        content_type: 'post',
        order: '-fields.createdAt'
      }),
      client.getEntries({
        content_type: 'meetup',
        order: '-fields.date'
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
