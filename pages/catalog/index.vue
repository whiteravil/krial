<template>

  <div class="categories-page">

    <CatalogMainWindow
      :title="catalogCategory.title"
      :sliderTitle="catalogCategory.advantages.title"
      :slideList="catalogCategory.advantages.list"
      :downloadButton="false"/>

    <section class="s-categories">
      <div class="container">

        <div class="xs-title">Быстрый подбор оборудования</div>

        <FiltersCategory/>

        <CatalogCategoryItems :list="products" />

      </div>
    </section>

  </div>

</template>

<script>

import { mapState } from 'vuex'

export default {
  name: 'catalog.vue',
  asyncData ({ store }) {
    return Promise.all([
      store.dispatch('catalogCategory/getCatalogCategoryInfo'),
      store.dispatch('catalogCategory/getCatalogCategories')
    ])
  },
  computed: {
    ...mapState({
      catalogCategory: state => state.catalogCategory,
      products: state => state.catalogCategory.catalogCategories
    })
  },
  data: () => ({
    swiperOptions: {
      slidesPerView: 3,
      spaceBetween: 20,
      navigation: {
        nextEl: '.main-slider-button-next',
        prevEl: '.main-slider-button-prev'
      }
    }
  })
}
</script>
