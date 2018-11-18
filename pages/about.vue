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
    <div 
      :class="$style.post" 
      v-html="markdownedBody"/>
  </div>
</template>

<script>
import { createClient } from '~/plugins/contentful.js'
const client = createClient()
const MarkdownIt = require('markdown-it')('commonmark')

export default {
  computed: {
    markdownedBody() {
      return MarkdownIt.render(this.article.fields.body)
    }
  },
  asyncData() {
    return Promise.all([
      client.getEntries({
        content_type: 'article',
        'fields.name': 'about',
        limit: 1
      })
    ])
      .then(([articles]) => {
        return {
          article: articles.items[0]
        }
      })
      .catch(console.error)
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
</style>
