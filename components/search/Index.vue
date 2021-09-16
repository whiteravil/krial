<template>

  <div class="search-component">

    <div class="search-main">

      <div class="search-close">
        <span class="icon-close"></span>
      </div>

      <div
        class="search-form"
        :class="{'active': searchFullContainer}">

        <input
          type="text"
          class="search-input"
          placeholder="Поиск по сайту"
          v-model="searchVal"
          @click="openSearchFullContainer"
          @focus="openSearchDropdown"
          @blur="closeSearchDropdown"
          @input="searchKeypress">

        <div
          class="clear-search-field"
          @click="clearSearchField">
          <span class="icon-trash"></span>
        </div>

        <button type="submit" class="search-btn">
          <span class="icon-search"></span>
        </button>

        <div
          class="search-results-dropdown"
          @click="openSearchDropdown"
          :class="{'active': searchDropdownResults}">

          <div
            v-if="resultsVisible && morphSearchResults ? morphSearchResults.length > 0 : false"
            class="search-results">

            <div class="search-results-block">

              <div class="small-title">Результаты поиска</div>

              <div class="search-results-list">

                <div
                  v-for="result in morphSearchResults"
                  :key="result.id"
                  class="search-results-item">
                  <a :href="result.url">
                    {{ result.title }}
                  </a>
                </div>

              </div>

              <div class="search-results-btn">
                <a
                  href="#"
                  class="btn"
                  :class="{'loading': searchBtnLoading}"
                  @click="checkAllResults">Смотреть все результаты</a>
              </div>

            </div>

          </div>

          <div
            v-if="!resultsVisible && history ? history.length > 0 : false"
            class="search-history">

            <div class="search-results-block">

              <div class="small-title">История поиска</div>

              <div class="search-results-list">

                <div
                  v-for="historyLink in history"
                  :key="historyLink.id"
                  class="search-results-item">
                  <a :href="historyLink.url">
                    {{ historyLink.title }}
                  </a>
                </div>

              </div>

            </div>

          </div>

        </div>

      </div>

      <div
        class="search-results-component"
        :class="{'opened': searchFullContainer}">

        <div class="search-component-body">

          <div
            v-if="searchFull"
            class="search-results-full">

            <div class="search-results-full-top">

              <div class="search-results-full-qnt">
                32 найдено результатов
<!--                {{$options.filters.declensionNumbers(32, ['месяц', 'месяца', 'месяцев'])}}-->
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

            <div class="search-results-full-body">

              <div class="search-results-equipments-list">

                <div
                  v-for="searchItem in searchResultsEquipments"
                  :key="searchItem.id"
                  class="search-results-equipment">
                  {{searchItem.title}}
                </div>

              </div>

            </div>

          </div>

        </div>

        <div class="search-component-sidebar">

          <div
            class="search-component-close"
            @click="closeSearchFullContainer">
            <span class="icon-close"></span>
          </div>

          <div class="product-selection-link">

            <div class="product-selection-link-icon">
              <span class="icon-filter"></span>
            </div>

            <div class="product-selection-link-text">
              <span>Подбор оборудования</span>
            </div>

          </div>

        </div>

      </div>

      <div class="search-main-row">

        <div class="search-main-left">

          <div class="search-popular">

            <div class="small-title">Популярные разделы</div>

            <div class="search-popular-list">

              <div
                v-for="section in popularCategories"
                :key="section.id"
                class="search-popular-item">

                <a
                  :href="section.url"
                  class="search-popular-item-category-link">
                  {{section.title}}
                </a>

                <a
                  :href="currentCategory(section.id).url"
                  class="search-popular-item-link">
                  {{currentCategory(section.id).title}}
                </a>

              </div>

            </div>

          </div>

        </div>

        <div class="search-main-right">

          <div class="small-title">
            <a href="#">Подбор оборудования</a>
          </div>

          <div class="search-selection-main">

            <div
              class="search-selection-main-info"
              :class="{'hide': hoveredProduct !== 0}">

              <div class="h2">{{ selectionProducts.title }}</div>
              <img :src="selectionProducts.imgSrc" alt="">

            </div>

            <div
              v-for="product in selectionProducts.list"
              :key="product.id"
              class="search-selection-hover-info"
              :class="{'active': product.id === hoveredProduct}">
              <div class="h2">{{ product.title }}</div>
              <img :src="product.imgSrc" alt="">
            </div>

          </div>

          <div class="search-selection-products-list">

            <div
              v-for="product in selectionProducts.list"
              :key="product.id"
              class="search-selection-product">

              <a
                @mouseover="selectionProductHover(product.id)"
                :href="product.url">
                {{ product.title }}
              </a>

            </div>

          </div>

        </div>

      </div>

    </div>

  </div>

</template>

<script>

import { mapState, mapGetters } from 'vuex'

export default {
  name: 'Index.vue',
  computed: {
    ...mapState({
      popularCategories: state => state.search.popularCategories,
      selectionProducts: state => state.selectionProducts,
      history: state => state.search.history,
      morphSearchResults: state => state.search.morphSearchResults,
      searchResultsEquipments: state => state.search.searchResultsEquipments
    }),
    ...mapGetters({
      getCurrentCategory: 'categories/getCurrentCategory'
    }),
    currentCategory () {
      return index => this.getCurrentCategory(index)
    }
  },
  data: () => ({
    hoveredProduct: 0,
    searchFullContainer: true,
    searchDropdownResults: false,
    resultsVisible: false,
    searchBtnLoading: false,
    searchVal: '',
    searchFull: false,
    selectedTabs: 1
  }),
  methods: {
    selectionProductHover (id) {
      this.hoveredProduct = id
    },
    openSearchFullContainer () {
      this.searchFullContainer = true
    },
    closeSearchFullContainer () {
      this.searchFullContainer = false
    },
    openSearchDropdown () {
      this.searchDropdownResults = true
    },
    closeSearchDropdown () {
      this.searchDropdownResults = false
    },
    searchKeypress (e) {
      if (this.searchVal.trim().length > 1) {
        this.resultsVisible = true
      } else {
        this.resultsVisible = false
      }
    },
    clearSearchField () {
      this.searchVal = ''
    },
    checkAllResults () {
      this.searchBtnLoading = true
      this.$store.dispatch('search/getSearchResultEquipments', this.searchVal).then(() => {
        this.searchBtnLoading = false
        this.closeSearchDropdown()
        this.searchFull = true
      })
    },
    selectTab (id) {

    }
  }
}
</script>

<style scoped>

</style>
