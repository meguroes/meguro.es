<template>
  <div>
    <div :class="$style.imageList">
      <div>
        <img src="~/assets/images/photo/meguroes-photo1.jpg" >
      </div>
      <div>
        <img src="~/assets/images/photo/meguroes-photo3.jpg" >
      </div>
      <div>
        <img src="~/assets/images/photo/meguroes-photo2.jpg" >
      </div>
    </div>
    <section 
      :class="$style.post" 
      v-html="markdownedBody"/>
    <div
      v-for="sponsor in sponsors"
      :key="sponsor.fields.id"
    >
      <h1 v-if="sponsors.length">個人スポンサー</h1>
      継続的なMeguro.esの運営を支えていただいている、個人スポンサーの紹介をします。
      各回のスポンサーは、<nuxt-link to="meetup">イベント一覧</nuxt-link>から御覧ください。
      <Sponsor
        :sponsor="sponsor.fields"
        :class="$style.sponsor" />
    </div>
  </div>
</template>

<script>
import { createClient } from '~/plugins/contentful.js'
import Sponsor from '~/components/Sponsor.vue'

const client = createClient()
const MarkdownIt = require('markdown-it')('commonmark')

export default {
  components: {
    Sponsor
  },
  computed: {
    markdownedBody() {
      return MarkdownIt.render(this.article.fields.body)
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
  async asyncData() {
    const about = await client.getEntries({
      content_type: 'article',
      'fields.name': 'about',
      limit: 1
    })

    const sponsors = await client.getEntries({
      content_type: 'sponsor',
      'fields.meetup.sys.id': about.items[0].sys.id
    })

    return {
      article: about.items[0],
      sponsors: sponsors.items
    }
  }
}
</script>

<style lang="scss" module>
.imageList {
  margin: 2rem 0;
  width: 100%;
  flex-wrap: wrap;
  display: flex;
  justify-content: space-around;

  div {
    width: 32%;
    img {
      width: 100%;
    }
  }
  @media screen and (max-width: 959px) {
    div {
      width: 300px;
      img {
        width: 100%;
      }
    }

    div:last-of-type {
      display: none;
    }
  }
  @media screen and (max-width: 679px) {
    div:not(:first-of-type) {
      display: none;
    }
  }
}

.sponsor {
  margin: 1rem 0;
}
</style>
