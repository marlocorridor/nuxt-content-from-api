import { existsSync, mkdirSync, writeFileSync } from 'node:fs'
import { defineNuxtModule, addPlugin, createResolver } from '@nuxt/kit'

type Connection = {
  apiBase: string
  apiPath: string
  fetchOption: object
  slugAttribute: string
  contentAttribute: string
  directory: string
  fileExtension: string
  verbose: boolean
}

// Module options TypeScript interface definition
export interface ModuleOptions {
  connections: Connection[]
  enabled: boolean
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: 'nuxt-content-from-api',
    configKey: 'nuxtContentFromApi',
  },
  // Default configuration options of the Nuxt module
  defaults: {
    connections: [
      {
        apiBase: 'https://mocki.io/v1', // 'https://YOURHOST/api',
        apiPath: '/5902631b-810f-4696-a6f6-0f89b7f99844', // '/blog/all'
        fetchOption: {},
        slugAttribute: 'slug',
        contentAttribute: 'content',
        directory: './content/blog',
        fileExtension: '.md',
        verbose: true,
      },
      {
        apiBase: 'https://mocki.io/v1',
        apiPath: '/a630127a-8605-42be-a9a2-c595d504de73', // CSV sample
        fetchOption: {},
        slugAttribute: 'slug',
        contentAttribute: 'content',
        directory: './content/news/',
        fileExtension: '.csv',
        verbose: true,
      },
    ],
    enabled: true,
  },
  setup(options, nuxt) {
    const resolver = createResolver(import.meta.url)

    nuxt.hook('build:before', () => {
      // if enabled, continue to define hook
      if (!options.enabled) {
        return
      }

      // Process each connection setting
      options.connections.forEach((connection: Connection, connectionId: number) => {
        const url = connection.apiBase + connection.apiPath
        fetch(url, connection.fetchOption)
          .then(response => response.json())
          .then((jsonData) => {
            console.info(`Processing Content from Connection ${connectionId}: Starting...`)

            // Log response if verbose option is true
            if (connection.verbose) {
              console.info('Logging Content from API response...')
              console.log(jsonData)
              console.info('End of Logging API response.')
            }

            // create directory if not exist
            if (!existsSync(connection.directory)) {
              mkdirSync(connection.directory, {
                // supports nested directory
                recursive: true,
              })
            }

            // Define keys for attribute options
            const slug = connection.slugAttribute
            const content = connection.contentAttribute

            // Define with variable attribute. See reference: https://dev.to/jagroop2001/how-to-choose-your-type-typescript-interfaces-vs-types-51hc
            type Entry = {
              [key: string]: string
            }

            // write the file
            jsonData.forEach((entry: Entry, i: number) => {
              // skip if required data is not available
              if (!entry[slug] || !entry[content]) {
                console.error(`Data #${i}: "${slug}" or "${content}" not found. Skipping...`)
                return
              }

              // write the file using entry.slug as name for routing
              writeFileSync(
                connection.directory + entry.slug + connection.fileExtension,
                entry[content], { flag: 'w' },
              )
            })

            console.info('Processing Content from API: Completed!')
          })
          .finally(() => {
            console.info(`Processing Content from Connection ${connectionId}: DONE!`)
          })
      }) // end of connections.forEach
    })

    // Do not add the extension since the `.ts` will be transpiled to `.mjs` after `npm run prepack`
    addPlugin(resolver.resolve('./runtime/plugin'))
  },
})
