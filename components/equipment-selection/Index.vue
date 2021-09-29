<template>

  <div
    class="equipment-selection-component"
    :class="{'opened': opened}">

    <div class="equipment-selection-body">

      <div class="equipment-selection-sidebar">

        <div
          class="search-component-close"
          @click="closeSelection">
          <span class="icon-close"></span>
        </div>

        <div
          class="product-selection-link"
          @click="openSearch">

          <div class="product-selection-link-icon">
            <span class="icon-search"></span>
          </div>

          <div class="product-selection-link-text">
            <span>Поиск по сайту</span>
          </div>

        </div>

      </div>

      <div class="equipment-selection-content">

        <div class="equipment-selection-content-title">Подбор оборудования</div>

        <div class="equipment-selection-content-body">

          <div
            v-if="hoveredProductComponent"
            class="equipment-selection-content-equipments">

            <div class="equipment-selection-main">

              <div
                class="search-selection-main-info"
                :class="{'hide': hoveredProduct !== 0}">

                <div class="h1">{{ selectionProducts.title }}</div>
                <img :src="selectionProducts.imgSrc" alt="">

              </div>

              <div
                v-for="product in selectionProducts.list"
                :key="product.id"
                class="search-selection-hover-info"
                :class="{'active': product.id === hoveredProduct}">
                <div class="h2">{{ product.title }}</div>
                <ul
                  v-if="product.advantages.length > 0">
                  <li
                    v-for="(adv, index) in product.advantages"
                    :key="index">
                    {{ adv }}
                  </li>
                </ul>
                <img :src="product.imgSrc" alt="">
              </div>

            </div>

            <div class="equipment-selection-footer">

              <div class="search-selection-products-list">

                <div
                  v-for="product in selectionProducts.list"
                  :key="product.id"
                  class="search-selection-product">

                  <a
                    @mouseover="selectionProductHover(product.id)"
                    :href="product.url"
                    @click="openEquipmentSelectionSearch(product.id)">
                    {{ product.title }}
                  </a>

                </div>

              </div>

            </div>

          </div>

          <div
            v-if="equipmentSelectionSearch"
            class="equipment-selection-group"
            :class="{'loaded': equipmentSearchLoaded}">

            <div class="equipment-selection-selected">

              <div class="search-selection-hover-info active">
                <div class="h2">{{ selectedProduct.title }}</div>
                <ul
                  v-if="selectedProduct.advantages ? selectedProduct.advantages.length > 0 : false">
                  <li
                    v-for="(adv, index) in selectedProduct.advantages"
                    :key="index">
                    {{ adv }}
                  </li>
                </ul>
                <img :src="selectedProduct.imgSrc" alt="">
              </div>

            </div>

            <Filters
              @show-results="showResult()"/>

          </div>

          <div
            v-if="equipmentResults"
            class="equipment-selection-results"
            :class="{'active': equipmentResultsLoaded}">

            <Filters
              :disableType="true"
              :withSort="true"
              @loaded="updateSearchResults"/>

            <div class="equipment-selection-list">

              <SearchEquipmentResults
                :loaded="searchLoaded"
                :list="filterResults"/>

            </div>

          </div>

        </div>

      </div>

    </div>

  </div>

</template>

<script>

import { mapState } from 'vuex'

export default {
  name: 'Index',
  props: {
    selectedEquipment: [Number, Object]
  },
  computed: {
    ...mapState({
      selectionProducts: state => state.selectionProducts,
      selectedProduct: state => state.selectionProducts.selected,
      filterResults: state => state.filters.filterResults
    })
  },
  data: () => ({
    opened: false,
    hoveredProduct: 0,
    hoveredProductComponent: true,
    equipmentSelectionSearch: false,
    equipmentSearchLoaded: false,
    equipmentResults: false,
    searchLoaded: false,
    equipmentResultsLoaded: false
  }),
  methods: {
    closeSelection () {
      this.opened = false
      setTimeout(() => {
        this.$emit('close')
      }, 400)
    },
    openSearch () {
      this.closeSelection()
      this.$emit('open-search')
    },
    selectionProductHover (id) {
      this.hoveredProduct = id
    },
    openEquipmentSelectionSearch (id) {
      this.$store.commit('selectionProducts/setSelectedProduct', id)
      this.hoveredProductComponent = false
      this.equipmentSelectionSearch = true
      setTimeout(() => {
        this.equipmentSearchLoaded = true
      }, 50)
    },
    updateSearchResults (bool) {
      if (bool) {
        this.searchLoaded = true
      } else {
        this.searchLoaded = false
      }
    },
    showResult () {
      this.equipmentSelectionSearch = false
      this.equipmentSearchLoaded = false
      this.equipmentResults = true
      setTimeout(() => {
        this.equipmentResultsLoaded = true
      }, 20)
    }
  },
  mounted () {
    this.$store.dispatch('selectionProducts/getSelectionProducts')
    this.$store.dispatch('filters/getFilterResults')
    this.$store.commit('selectionProducts/setSelectedProduct', 1)
    setTimeout(() => {
      this.opened = true
    }, 50)
    if (this.selectedEquipment) {
      this.openEquipmentSelectionSearch(this.selectedEquipment)
    }
    document.body.classList.add('overflow-hidden')
    this.$once('hook:beforeDestroy', () => document.body.classList.remove('overflow-hidden'))
  }
}
</script>

<style scoped>

</style>
