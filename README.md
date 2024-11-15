# Nuxt Content from API

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![License][license-src]][license-href]
[![Nuxt][nuxt-src]][nuxt-href]

Nuxt module for [Nuxt Content](https://content.nuxt.com/) module.
This module takes your API to create MD files to implement full features of Nuxt Module `.md` source.

- [✨ &nbsp;Release Notes](https://github.com/marlocorridor/nuxt-content-from-api/blob/main/CHANGELOG.md)
- [🏀 Online playground](https://stackblitz.com/github/marlocorridor/nuxt-content-from-api?file=playground%2Fapp.vue)
- [📖 &nbsp;Documentation](https://github.com/marlocorridor/nuxt-content-from-api/blob/main/README.md)

## Features

<!-- Highlight some of the features your module provide here -->
- Supports multiple connection configuration
- Configurable API request (base url, path, `fetch` options)
- Configurable target directory for implementing [paths](https://content.nuxt.com/usage/content-directory#paths)
- Nuxt hook on `build:before`

## Quick Setup

Install the module to your Nuxt application with one command:

```bash
npx nuxi module add nuxt-content-from-api
```

Be sure that your API response is an array or objects that has `slug` and `content` attributes.
```json
[
  {
    "slug": "test-1",
    "content": "# my title\n Content 1"
  },
  {
    "slug": "test-2",
    "content": "# my title\n Content 2"
  }
]
```

That's it! You can now use Nuxt Content from API in your Nuxt app ✨

## Configuration

On your `nuxt.config.ts`,  define the `nuxtContentFromApi` attribute. Default values "works" with sample data.

```ts
{
  modules: [
    'nuxt-content-from-api',
  ],
  nuxtContentFromApi: {
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
  }
}
```

## Contribution

- *You may add your name here on your pull request*

<details>
  <summary>Local development</summary>
  
  ```bash
  # Install dependencies
  npm install
  
  # Generate type stubs
  npm run dev:prepare
  
  # Develop with the playground
  npm run dev
  
  # Build the playground
  npm run dev:build
  
  # Run ESLint
  npm run lint
  
  # Run Vitest
  npm run test
  npm run test:watch
  
  # Release new version
  npm run release
  ```

</details>


<!-- Badges -->
[npm-version-src]: https://img.shields.io/npm/v/nuxt-content-from-api/latest.svg?style=flat&colorA=020420&colorB=00DC82
[npm-version-href]: https://npmjs.com/package/nuxt-content-from-api

[npm-downloads-src]: https://img.shields.io/npm/dm/nuxt-content-from-api.svg?style=flat&colorA=020420&colorB=00DC82
[npm-downloads-href]: https://npm.chart.dev/nuxt-content-from-api

[license-src]: https://img.shields.io/npm/l/nuxt-content-from-api.svg?style=flat&colorA=020420&colorB=00DC82
[license-href]: https://npmjs.com/package/nuxt-content-from-api

[nuxt-src]: https://img.shields.io/badge/Nuxt-020420?logo=nuxt.js
[nuxt-href]: https://nuxt.com
