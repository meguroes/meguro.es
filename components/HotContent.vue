<template>
  <div 
    v-if="topic" 
    :class="$style.wrapper">
    <span :class="$style.topic">注目のイベント</span>
    <div :class="$style.inner">
      <span :class="$style.title">{{ topic.fields.title }}</span>
      {{ topic.fields.date | toJPDate }}
      <a 
        :class="$style.eventUrl"
        :href="topic.fields.eventUrl" 
        target="_blank">イベント募集ページ</a>
    </div>
  </div>
</template>

<script>
import { createClient } from '~/plugins/contentful.js'
const client = createClient()

export default {
  components: {},
  data: function() {
    return {
      topic: null
    }
  },

  created() {
    new Promise((resolve, reject) => {
      resolve(
        client.getEntries({
          content_type: 'meetup',
          'fields.hero': true
        })
      )
    }).then(meetup => {
      this.topic = meetup.items[0]
    })
  }
}
</script>

<style lang="scss" module>
.wrapper {
  position: relative;
  border: 2px solid $SECONDARY_COLOR;
  background: $PRIMARY_LIGHTEN_2_COLOR;
  border-radius: 0 0 20px 0;
}

.inner {
  padding: 1.5rem 1rem 0.5rem 1rem;
}

.topic {
  position: absolute;
  top: 0;
  left: 0;
  background: $SECONDARY_COLOR;
  color: $PRIMARY_LIGHTEN_2_COLOR;
  font-size: $x-small-font-size;
  font-weight: bolder;
  padding: 0.1rem 0.5rem;
  border-radius: 0 0 20px 0;
}

.title {
  font-weight: bold;
}

.eventUrl {
  word-break: keep-all;
}
</style>
