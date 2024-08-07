export default defineNuxtConfig({
  site: {
    url: 'https://example.com',
    indexable: true
  },
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  modules: ["@nuxt/content", "@nuxtjs/robots"],
  app: {
    head: {
      link: [
        {
          rel: 'stylesheet',
          href: 'https://cdnjs.cloudflare.com/ajax/libs/bootstrap/5.3.0/css/bootstrap.min.css'
        },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap" rel="stylesheet'
        }
      ],
      script: [
        {
          src: 'https://cdnjs.cloudflare.com/ajax/libs/bootstrap/5.3.0/js/bootstrap.bundle.min.js',
          type: 'text/javascript'
        }
      ]
      
    }
  },
  robots: {
    credits: false,
    debug: false
  },
  content: {
    documentDriven: true
  },
  css: [
    '~/assets/main.css'
  ],
  vue: {
    compilerOptions: {
      isCustomElement: tag => tag === 'Esim',
    },
  }
})