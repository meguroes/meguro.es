import { createClient } from './plugins/contentful.js'
const pkg = require('./package')
const client = createClient()

module.exports = {
  mode: 'spa',

  /*
  ** Headers of the page
  */
  head: {
    title: 'Meguro.es | 目黒周辺のFront-end meetup.',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content:
          'Meguro.es は 目黒(区|駅)周辺で2か月に1回行われるフロントエンド開発者のMeetup(勉強会)です。' +
          '目黒周辺にお住まいの方・お勤めの方はもちろんのこと、フロントエンドに興味がある方はどなたでも参加大歓迎です'
      },
      {
        hid: 'og:title',
        name: 'og:title',
        content: 'Meguro.es | 目黒周辺のFront-end meetup.'
      },
      {
        hid: 'og:description',
        name: 'og:description',
        content:
          'Meguro.es は 目黒(区|駅)周辺で2か月に1回行われるフロントエンド開発者のMeetup(勉強会)です。' +
          '目黒周辺にお住まいの方・お勤めの方はもちろんのこと、フロントエンドに興味がある方はどなたでも参加大歓迎です'
      },
      {
        hid: 'og:image',
        name: 'og:image',
        content: 'https://meguro.es/meguroes-og.png'
      },
      {
        hid: 'og:site_name',
        name: 'og:site_name',
        content: 'Meguro.es'
      },
      {
        hid: 'twitter:card',
        name: 'twitter:card',
        content: 'summary'
      }
    ],
    link: [
      {
        rel: 'shortcut icon',
        type: 'image/png',
        href: '/favicon.png',
        sizes: '128x128'
      }
    ]
  },

  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#A69223', height: '10px' },

  transition: {
    name: 'transition'
  },

  /*
  ** Global CSS
  */
  css: ['normalize.css', '~/assets/scss/common.scss'],
  sassResources: ['~/assets/scss/variables/*.scss'],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: ['~/plugins/filters.js'],

  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://github.com/nuxt-community/axios-module#usage
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
    'nuxt-sass-resources-loader',
    [
      '@nuxtjs/google-analytics',
      {
        id: 'UA-128582081-1'
      }
    ]
  ],
  workbox: {
    dev: true
  },
  /*
  ** Axios module configuration
  */
  axios: {
    // See https://github.com/nuxt-community/axios-module#options
  },

  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {
      const vueloader = config.module.rules.find(e => {
        return e.test.toString() === '/\\.vue$/'
      })

      vueloader.options.cssModules = {
        localIdentName:
          process.env.NODE_ENV !== 'production'
            ? '[path]--[local]---[hash:base64:8]'
            : '[hash:base64:8]',
        camelCase: true
      }

      // Run ESLint on save
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  },
  generate: {
    fallback: true,
    routes() {
      return Promise.all([
        client.getEntries({
          content_type: 'post'
        }),
        client.getEntries({
          content_type: 'meetup'
        })
      ]).then(([posts, meetups]) => {
        return [
          ...posts.items.map(post => `posts/${post.fields.slug}`),
          ...meetups.items.map(meetup => `meetup/${meetup.fields.number}`)
        ]
      })
    }
  }
}
