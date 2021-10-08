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
                @selectItem="selectedSort = $event"/>
            </div>
          </div>

          <div class="catalog-view">
            <a
              href="#"
              class="catalog-view-btn active">
              <span class="icon-grid"/>
            </a>
            <a
              href="#"
              class="catalog-view-btn">
              <span class="icon-list"/>
            </a>
          </div>

        </div>

        <div class="catalog">

          <template
            v-for="product in paginatedData">

            <ProductsGridView
              v-if="product.type === 1"
              :key="product.id"
              :item="product"/>

            <Advertising
              v-if="product.type === 2"
              :key="product.id"
              :item="product"/>

            <ProductsGridViewBig
              v-if="product.type === 3"
              :key="product.id"
              :item="product"/>

            <div
              v-if="product.type === 4"
              :key="product.id"
              class="catalog-order-block">
              <div class="h3">Нужен контрагент для плотного сотрудничества?</div>
              <p>Подберем оборудование с учетов всех условий эксплуатации</p>
              <button class="btn">Оставить заявку</button>
            </div>

          </template>

        </div>

        <BlocksPagination
          :length="products.length"
          :pages="pages"
          :paginatedLength="paginatedData.length"
          :visibleLength="visibleLength"
          :page="currentPage"
          @page-to="currentPage = $event"
          @load-more="loadMore"/>

      </div>
    </section>

    <section class="s-useful-articles">
      <div class="container">

        <div class="section-title">
          <div class="h2">Полезные статьи о оборудовании</div>
        </div>

        <BlocksArticlesSlider />

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
    }),
    pages () {
      return Math.ceil(this.products.length / this.visibleLength)
    },
    paginatedData () {
      const start = (this.currentPage - 1) * this.visibleLength
      const end = start + this.visibleLength
      return this.products.slice(start, end)
    }
  },
  data: () => ({
    selectedSort: 0,
    currentPage: 1,
    visibleLength: 19
  }),
  methods: {
    loadMore () {
      if ((this.products.length - this.visibleLength) < 4) {
        this.visibleLength = this.products.length
      } else {
        this.visibleLength = this.visibleLength + 4
      }
    }
  },
  mounted () {
    const catalogItems = document.querySelectorAll('.catalog-item .catalog-item-img img')
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
