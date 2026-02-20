export default defineNuxtConfig({
  modules: [
    '@nuxt/eslint',
    '@nuxt/ui',
    '@vueuse/nuxt',
    '@nuxt/image',
    '@nuxt/content',
    'nuxt-og-image',
    '@nuxtjs/i18n'
  ],
  devtools: {
    enabled: false
  },
  css: ['~/assets/css/main.css'],
  routeRules: {
    '/api/**': {
      cors: true
    },
    'en/dash/**': { appLayout: 'dash' },
    '/en/settings/**': { appLayout: 'dash' },
    '/en/customers/**': { appLayout: 'dash' },
    '/en/inbox/**': { appLayout: 'dash' },
    '/en/translate/**': { appLayout: 'dash' },
    '/en/docs/**': { appLayout: 'docs' },
    '/en/login/**': { appLayout: 'auth' },
    '/en/signup/**': { appLayout: 'auth' },
    'fi/dash/**': { appLayout: 'dash' },
    '/fi/settings/**': { appLayout: 'dash' },
    '/fi/customers/**': { appLayout: 'dash' },
    '/fi/translate/**': { appLayout: 'dash' },
    '/fi/inbox/**': { appLayout: 'dash' },
    '/fi/docs/**': { appLayout: 'docs' },
    '/fi/login/**': { appLayout: 'auth' },
    '/fi/signup/**': { appLayout: 'auth' }
  },
  compatibilityDate: '2026-01-31',
  /* nitro: {
    prerender: {
      routes: ['/'],
      crawlLinks: true
    }
  }, */
  telemetry: false,
  eslint: {
    config: {
      stylistic: {
        commaDangle: 'never',
        braceStyle: '1tbs'
      }
    }
  },
  fonts: {
    families: [
      { name: 'Finlandica', provider: 'bunny' },
      { name: 'Arima Madurai', provider: 'bunny' },
      { name: 'Chivo Mono', provider: 'bunny' },
      { name: 'Caveat', provider: 'bunny' }
    ]
  },
  i18n: {
    locales: [
      { code: 'en', name: 'English', language: 'en-US', icon: 'cat:usa', dir: 'ltr', file: 'en.yml' },
      { code: 'fi', name: 'Suomi', language: 'fi-FI', icon: 'cat:finland', dir: 'ltr', file: 'fi.yml' }
    ],
    strategy: 'prefix',
    defaultLocale: 'en',
    skipSettingLocaleOnNavigate: true
  },
  icon: {
    provider: 'iconify',
    customCollections: [{
      prefix: 'cat',
      dir: './app/assets/icons'
    }],
    clientBundle: {
      scan: true,
      includeCustomCollections: true
    }
  }
})
