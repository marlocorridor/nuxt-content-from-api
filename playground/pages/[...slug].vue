<template>
  <main>
    <ContentDoc>
      <template #default="{ doc }">
        {{ doc.title }}
        <ContentRenderer :value="doc">
          <template #empty>
            <!-- see https://content.nuxt.com/components/content-renderer -->
            <!-- Other types will currently be passed to default slot via v-slot="{ data }" or be rendered inside <pre /> tag. -->
            <p>
              <span v-if="doc._type != 'md'">This is a <b><code>{{ doc._type }}</code></b> document</span>
            </p>
            <p>No content found.</p>
          </template>
        </ContentRenderer>
      </template>
      <template #not-found>
        <h1>Document not found</h1>
      </template>
    </ContentDoc>
  </main>
</template>
