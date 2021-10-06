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

        <div class="catalog-filter">

          <div class="catalog-sort">
            <div class="sort-select-component">
              <div class="sort-select-component-title">Сортировать</div>
              <FiltersSortSelect
                :list="sorts"
                :selected="selectedSort"
                @selectItem="selectedSort = $event" />
            </div>
          </div>

          <div class="catalog-view">
            <a
              href="#"
              class="catalog-view-btn active">
              <span class="icon-grid" />
            </a>
            <a
              href="#"
              class="catalog-view-btn">
              <span class="icon-list" />
            </a>
          </div>

        </div>

        <div class="catalog">

          <template
            v-for="product in products">
            <ProductsGridView
              v-if="product.type === 1"
              :key="product.id"
              :item="product"/>
          </template>

        </div>

      </div>
    </section>

  </div>

</template>

<script>

import { mapState } from 'vuex'

export default {
  async asyncData ({ store }) {
    await Promise.all([
      store.dispatch('catalog/getCatalogInfo'),
      store.dispatch('catalog/getCatalogProducts')
    ])
  },
  name: 'catalog.vue',
  computed: {
    ...mapState({
      catalogInfo: state => state.catalog,
      sorts: state => state.filters.sorts,
      products: state => state.catalog.products
    })
  },
  data: () => ({
    selectedSort: 0
  }),
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
        } else {
          item.style.filter = 'grayscale(1)'
        }
      })
    }
    document.addEventListener('mousemove', hoverListener)
    this.$once('hook:beforeDestroy', () => document.removeEventListener('mousemove', hoverListener))

    this.$store.dispatch('filters/getSorts').then(() => {
      this.selectedSort = this.sorts[0].id
    })
  }
}
</script>
