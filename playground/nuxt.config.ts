export default defineNuxtConfig({
  modules: ['../src/module'],
  nuxtContentFromApi: {
    apiBase: 'https://YOURHOST/api',
    apiPath: '/blog/all',
    fetchOption: {
      method: null,
      body: null,
      headers: null,
    },
    directory: './content/',
    verbose: true,
},
  devtools: { enabled: true },
  compatibilityDate: '2024-11-12',
})
