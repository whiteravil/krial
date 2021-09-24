<template>

  <div
    class="search-results-component"
    :class="{'opened': opened}">

    <div class="search-component-body">

      <div
        v-if="resultsVisible"
        class="search-results-full">

        <div class="search-results-full-top">

          <div class="search-results-full-qnt">
            {{ returnResultsQnt() }}
          </div>

          <nav class="search-results-tabs">
            <a
              href="#"
              :class="{'active': selectedTabs === 1}"
              @click="selectTab(1)">Оборудование</a>
            <a
              href="#"
              :class="{'active': selectedTabs === 2}"
              @click="selectTab(2)">Пресс-центр</a>
            <a
              href="#"
              :class="{'active': selectedTabs === 3}"
              @click="selectTab(3)">Услуги</a>
          </nav>

        </div>

        <div class="search-results-tabs-blocks">

          <div
            class="search-results-tabs-block"
            :class="{'active': selectedTabs === 1}">

            <SearchEquipmentResults :list="searchResultsEquipments"/>

          </div>

          <div
            class="search-results-tabs-block"
            :class="{'active': selectedTabs === 2}">

            <div class="press-center-results-list">

              <ProductsListItem
                v-for="searchItem in searchResultsPressCenters"
                :product="searchItem"
                :key="searchItem.id" />

            </div>

          </div>

        </div>

      </div>

    </div>

    <div class="search-component-sidebar">

      <div
        class="search-component-close"
        @click="closeSearch">
        <span class="icon-close"></span>
      </div>

      <div
        class="product-selection-link"
        @click="$emit('open-selection-component')">

        <div class="product-selection-link-icon">
          <span class="icon-filter"></span>
        </div>

        <div class="product-selection-link-text">
          <span>Подбор оборудования</span>
        </div>

      </div>

    </div>

  </div>

</template>

<script>

import { mapState } from 'vuex'

export default {
  name: 'FullResults',
  props: {
    opened: Boolean,
    resultsVisible: Boolean
  },
  computed: {
    ...mapState({
      searchResultsEquipments: state => state.search.searchResultsEquipments,
      searchResultsPressCenters: state => state.search.searchResultsPressCenters
    })
  },
  data: () => ({
    selectedTabs: 1
  }),
  methods: {
    returnResultsQnt () {
      let qnt = 0
      switch (this.selectedTabs) {
        case 1:
          qnt = this.searchResultsEquipments.length
          break
        case 2:
          qnt = this.searchResultsPressCenters.length
          break
      }
      return `${qnt} ${this.$options.filters.declensionNumbers(qnt, ['найден результат', 'найдено результата', 'найдено результатов'])}`
    },
    closeSearch () {
      this.$emit('close-search')
    },
    selectTab (id) {
      this.selectedTabs = id
    }
  }
}
</script>

<style scoped>

</style>
