export default defineNuxtConfig({
  modules: [
    '../src/module',
    '@nuxt/content'
  ],
  devtools: { enabled: true },
  compatibilityDate: '2024-11-12',
  nuxtContentFromApi: {
    connections: [
      {
        apiBase: 'https://mocki.io/v1', // 'https://YOURHOST/api',
        apiPath: '/5902631b-810f-4696-a6f6-0f89b7f99844', // '/blog/all'
        fetchOption: {},
        slugAttribute: 'slug',
        contentAttribute: 'content',
        directory: './playground/content/blog/',
        fileExtension: '.md',
        verbose: true,
      },
      {
        apiBase: 'https://mocki.io/v1',
        apiPath: '/a630127a-8605-42be-a9a2-c595d504de73', // CSV sample
        fetchOption: {},
        slugAttribute: 'slug',
        contentAttribute: 'content',
        directory: './playground/content/news/',
        fileExtension: '.csv',
        verbose: true,
      },
    ],
    enabled: true,
  },
})