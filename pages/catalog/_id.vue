<template>

  <div class="catalog-page">

    <CatalogMainWindow
      :title="catalogInfo.pageTitle"
      :sliderTitle="catalogInfo.catalogAdvantages.title"
      :slideList="catalogInfo.catalogAdvantages.list"
      :downloadButton="false"/>

    <section class="s-catalog">
      <div class="container">

        <Filters :withBtns="false"/>

        <div class="catalog">

          <div class="catalog-item"></div>
          <div class="catalog-item"></div>
          <div class="catalog-item"></div>
          <div class="catalog-item"></div>
          <div class="catalog-item"></div>
          <div class="catalog-item"></div>
          <div class="catalog-item"></div>
          <div class="catalog-item"></div>
          <div class="catalog-item"></div>

        </div>

      </div>
    </section>

  </div>

</template>

<script>

import { mapState } from 'vuex'

export default {
  asyncData ({ store }) {
    return store.dispatch('catalog/getCatalogInfo')
  },
  name: 'catalog.vue',
  computed: {
    ...mapState({
      catalogInfo: state => state.catalog
    })
  },
  mounted () {
    const catalogItems = document.querySelectorAll('.catalog-item')
    console.log(catalogItems)
    const hoverListener = e => {
      console.log(e)
    }
    document.addEventListener('mouseover', hoverListener)
    this.$once('hook:beforeDestroy', () => document.removeEventListener('mouseover', hoverListener))
  }
}
</script>
