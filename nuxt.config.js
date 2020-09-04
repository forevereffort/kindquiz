require('dotenv').config()
const colors = require('vuetify/es5/util/colors').default

module.exports = {
  mode: 'universal',
  /*
  ** Headers of the page
  */
  head: {
    // titleTemplate: '%s - ' + 'The Kind Quiz',
    title: 'The Kind Quiz' || '',
    meta: [
      { charset: 'utf-8' },

      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' },
      { hid: 'keywords', content: 'kindness summery quiz grow' },
      { hid: 'copyright', content: 'Summery Inc' },
      { hid: 'author', content: 'Summery Inc' },
      { hid: 'email', content: 'erin@summery.ai' },
      // <meta name="Charset" content="UTF-8">
      // <meta name="Distribution" content="Global">
      // <meta name="Rating" content="General">
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'icon', type: 'image/x-icon', href: 'https://summery.ai/wp-content/uploads/2019/05/cropped-summery-favicon-192x192.png' },
      { rel: 'apple-touch-icon-precomposed', type: 'image/x-icon', href: 'https://summery.ai/wp-content/uploads/2019/05/cropped-summery-favicon-180x180.png' }
    ]
  },

  generate: {
    routes: [
      '/kindcolab',
      '/education',
      '/esd-global',
      '/classic',
      '/nasdaq-entrepreneurial-center'
    ]
  },

  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },
  /*
  ** Global CSS
  */
  css: [
    '@/assets/css/main.scss',
    'material-design-icons-iconfont/dist/material-design-icons.css'
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '@/plugins/vue-glide',
    '@/plugins/vue-fragment',
    '@/plugins/filters',
    {
      src: '~/plugins/vue-apexcharts',
      ssr: false
    },
    '~/plugins/vue-moment.js',
    '~/plugins/i18n.js',
    { src: '~plugins/ga.js', mode: 'client' }
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
    ['@nuxtjs/google-analytics', {
      id: 'UA-79846215-2',
      debug: {
        enabled: true,
        sendHitTask: true
      }
    }],
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    ['@nuxtjs/vuetify', {
      // customVariables: ['~/assets/variables.scss'],
      theme: {
        themes: {
          dark: {
            primary: '#ffc71a',
            secondary: '#736C61',
            accent: '#82B1FF',
            error: '#FF5252',
            info: '#2196F3',
            success: '#4CAF50',
            warning: '#FFC107'
          },
          light: {
            primary: '#ffc71a',
            secondary: '#736C61',
            accent: '#82B1FF',
            error: '#FF5252',
            info: '#2196F3',
            success: '#4CAF50',
            warning: '#FFC107'
          }
        }
      },
      icons: {
        iconfont: 'mdi' // || 'mdiSvg' || 'md' || 'fa' || 'fa4'
      }
    }],

    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
    // Doc: https://github.com/nuxt-community/dotenv-module
    '@nuxtjs/dotenv',
    ['@nuxtjs/google-analytics', {
      id: 'UA-79846215-2'
    }],
  ],
  /*
  ** Axios module configuration
  ** See https://axios.nuxtjs.org/options
  */
  axios: {
    baseURL: process.env.API_URL
  },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend (config, ctx) {
    }
  }
}
