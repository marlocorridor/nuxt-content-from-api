import MyModule from '../../../src/module'

export default defineNuxtConfig({
  modules: [
    MyModule,
  ],
  nuxtContentFromApi: {
    apiBase: 'https://mocki.io/v1',
    apiPath: '/5902631b-810f-4696-a6f6-0f89b7f99844',
    fetchOption: {
      method: null,
      body: null,
      headers: null,
    },
    directory: './content/',
    verbose: true,
  },
})
