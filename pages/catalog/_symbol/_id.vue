<template>
  <div class="s-product">
    <div class="container">

      <div class="product-row">

        <div class="product-left">
          <nav class="product-page-nav">
            <a
              v-for="link in nav"
              :key="link.id"
              :href="link.url"
              :class="{'active': link.id === activeNavLink}">
              {{ link.title }}
            </a>
          </nav>
        </div>

        <div class="product-right">

          <UIBreadcrumbs />

        </div>

      </div>

    </div>

  </div>
</template>

<script>
export default {
  name: 'ProductPage',
  data: () => ({
    activeNavLink: 1,
    nav: [
      {
        id: 1,
        title: 'KES-GEN315PC',
        url: '#s-1'
      },
      {
        id: 2,
        title: 'Как купить',
        url: '#s-2'
      },
      {
        id: 3,
        title: 'Характеристики',
        url: '#s-3'
      },
      {
        id: 4,
        title: 'Описание',
        url: '#s-4'
      },
      {
        id: 5,
        title: 'Bсполнение',
        url: '#s-5'
      },
      {
        id: 6,
        title: 'Сервис',
        url: '#s-6'
      },
      {
        id: 7,
        title: 'Проекты',
        url: '#s-7'
      },
      {
        id: 8,
        title: 'Ответы на вопросы',
        url: '#s-8'
      },
      {
        id: 9,
        title: 'Аналоги',
        url: '#s-9'
      },
      {
        id: 10,
        title: 'Статьи',
        url: '#s-10'
      }
    ]
  })
}
</script>

<style scoped>

</style>
