<template>

  <nav class="breadcrumbs">
    <template v-for="link in breadcrumbs">

      <nuxt-link
        v-if="link.url"
        :key="link.id"
        :to="link.url">
        {{ link.title }}
      </nuxt-link>

      <span
        v-else
        :key="link.id">
        {{ link.title }}
      </span>

    </template>
  </nav>

</template>

<script>
export default {
  name: 'UIBreadcrumbs',
  data: () => ({
    breadcrumbs: [
      {
        id: 1,
        title: 'Каталог продукции',
        url: '/catalog'
      },
      {
        id: 2,
        title: 'Электростанции',
        url: '/catalog/dizelnye-generatory-i-ehlektrostancii'
      },
      {
        id: 3,
        title: 'Дизельные электростанции'
      }
    ]
  })
}
</script>

<style scoped>

</style>
