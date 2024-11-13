import { defineNuxtModule, addPlugin, createResolver } from '@nuxt/kit'
import { existsSync, mkdirSync, writeFileSync } from 'node:fs'

// Module options TypeScript interface definition
export interface ModuleOptions {
  apiBase: string, apiPath: string, fetchOption: object, directory: string, verbose: boolean
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: 'nuxt-content-from-api',
    configKey: 'nuxtContentFromApi',
  },
  // Default configuration options of the Nuxt module
  defaults: {
    apiBase: 'https://YOURHOST/api',
    apiPath: '/blog/all',
    fetchOption: {},
    directory: './content/',
    verbose: false,
  },
  setup(options, nuxt) {
    const resolver = createResolver(import.meta.url)

    nuxt.hook('build:before', () => {
      const url = options.apiBase + options.apiPath
      fetch(url, options.fetchOption)
          .then(response => response.json())
          .then(jsonData => {
            console.info('Processing Content from API: Starting...')

            // Log response if verbose option is true
            if (options.verbose) {
              console.info('Logging Content from API response...')
              console.log(jsonData)
              console.info('End of Logging API response.')
            }

            // create directory if not exist
            if (!existsSync(options.directory)) {
              mkdirSync(options.directory, {
                // supports nested directory
                recursive: true
              })
            }

            // write the filed
            jsonData.forEach((entry: { slug: string; content: string | NodeJS.ArrayBufferView; }) => {
              // skip if required data is not available
              if (!entry.slug || !entry.content) {
                console.error('`slug` and/or `content` not found. Skipping...')
                return
              }

              // write the file using entry.slug as name for routing
              writeFileSync(
                options.directory + entry.slug + '.md',
                entry.content, { flag : 'w'}
              )
            })

            console.info('Processing Content from API: Completed!')
          })
    })
    // Do not add the extension since the `.ts` will be transpiled to `.mjs` after `npm run prepack`
    addPlugin(resolver.resolve('./runtime/plugin'))
  },
})
