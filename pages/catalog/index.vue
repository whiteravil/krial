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

      </div>
    </section>

  </div>

</template>

<script>

import { mapState } from 'vuex'

export default {
  name: 'catalog.vue',
  computed: {
    ...mapState({
      catalogCategory: state => state.catalogCategory
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
  }),
  mounted () {
    this.$store.dispatch('catalogCategory/getCatalogCategoryInfo')
    this.$store.dispatch('catalogCategory/getCatalogCategories')
  }
}
</script>
