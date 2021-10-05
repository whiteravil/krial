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
    const hoverListener = e => {
      let rd = 800
      let cx = e.clientX
      let cy = e.clientY
      catalogItems.forEach(item => {
        let it = item.getBoundingClientRect()
        let itx = Math.abs(it.x + it.width / 2)
        let ity = Math.abs(it.y + it.height / 2)
        let res = Math.abs(Math.sqrt(Math.pow(cx - itx, 2) + Math.pow(cy - ity, 2)))
        if (res < rd) {
          let sc = 1 - (rd - res) / rd
          item.style.filter = `grayscale(${sc})`
        }
      })
    }
    document.addEventListener('mousemove', hoverListener)
    this.$once('hook:beforeDestroy', () => document.removeEventListener('mousemove', hoverListener))
  }
}
</script>
