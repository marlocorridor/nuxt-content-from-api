<template>
  <main>
    <nav>
      <ContentNavigation v-slot="{ navigation }">
        <ul>
          <li
            v-for="link of navigation"
            :key="link._path"
          >
            <NuxtLink :to="link._path">
              {{ link.navTitle || link.title }}
            </NuxtLink>
          </li>
        </ul>
      </ContentNavigation>
    </nav>

    <h1>Index page</h1>

    <h2>News</h2>
    <ContentList
      v-slot="{ list }"
      path="/news"
    >
      <div
        v-for="article in list"
        :key="article._path"
      >
        <NuxtLink :to="article._path">
          <h3>{{ article.title }}</h3>
        </NuxtLink>
        <p>{{ article.description }}</p>
      </div>
    </ContentList>

    <h2>Blogs</h2>
    <ContentList
      v-slot="{ list }"
      path="/blog"
    >
      <div
        v-for="article in list"
        :key="article._path"
      >
        <NuxtLink :to="article._path">
          <h3>{{ article.title }}</h3>
        </NuxtLink>
        <p>{{ article.description }}</p>
      </div>
    </ContentList>
  </main>
</template>

<script lang="ts" setup>
</script>
