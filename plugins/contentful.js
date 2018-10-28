// ./plugins/contentful.js

const contentful = require('contentful')
// use default environment config for convenience
// these will be set via `env` property in nuxt.config.js
const config = {
  space: 'q7057uwnn7gw',
  accessToken:
    'e652a14c5741fb1f6006500dbfe4d3c8480fa5501b2b4d5e1ca1220097904f71'
}

// export `createClient` to use it in page components
export const createClient = () => contentful.createClient(config)
