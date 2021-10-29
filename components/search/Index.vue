<template>

  <div
    class="search-component"
    :class="[{'opened': opened}, {'loaded': loaded}]"
    :style="{'display': visible ? 'block' : 'none'}">

    <div class="search-main">

      <div
        class="search-close"
        @click="closeSearch">
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
          v-click-outside="clickOutsideSearch"
          @click="openSearchFullContainer"
          @focus="openSearchDropdown"
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
          :class="{'active': searchDropdownResults}">

          <div
            v-if="morphSearchLoading"
            class="morph-results-loaded" />

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
                  v-loading="searchBtnLoading"
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

      <FullResults
        :opened="searchFullContainer"
        :resultsVisible="searchFull"
        @close-search="closeSearchFullContainer"
        @open-selection-component="openSelectionComponent"/>

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

          <div class="small-title">Подбор оборудования</div>

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
                :href="product.url"
                @mouseover="selectionProductHover(product.id)"
                @click="$emit('open-selection', product.id)">
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
import FullResults from './FullResults'

export default {
  async fetch () {
    await Promise.all([
      this.$store.dispatch('categories/getCategories'),
      this.$store.dispatch('selectionProducts/getSelectionProducts'),
      this.$store.dispatch('search/getPopularCategories'),
      this.$store.dispatch('search/getHistory')
    ])
  },
  name: 'Index.vue',
  components: { FullResults },
  computed: {
    ...mapState({
      popularCategories: state => state.search.popularCategories,
      selectionProducts: state => state.selectionProducts,
      history: state => state.search.history,
      morphSearchResults: state => state.search.morphSearchResults,
      searchResultsPressCenters: state => state.search.searchResultsPressCenters,
      searchResultsServices: state => state.search.searchResultsServices
    }),
    ...mapGetters({
      getCurrentCategory: 'categories/getCurrentCategory'
    }),
    currentCategory () {
      return index => this.getCurrentCategory(index) ? this.getCurrentCategory(index) : {}
    }
  },
  data: () => ({
    opened: false,
    visible: false,
    loaded: false,
    searchBtnLoading: false,
    morphSearchLoading: false,
    hoveredProduct: 0,
    searchFull: false,
    searchFullContainer: false,
    searchDropdownResults: false,
    resultsVisible: false,
    searchVal: ''
  }),
  methods: {
    closeSearch () {
      this.opened = false
      setTimeout(() => {
        this.visible = false
        this.loaded = false
        this.$emit('close')
      }, 400)
    },
    clickOutsideSearch (e) {
      const tg = e.target
      if (!tg.closest('.search-results-dropdown')) {
        this.closeSearchDropdown()
      }
    },
    selectionProductHover (id) {
      this.hoveredProduct = id
    },
    openSearchFullContainer () {
      this.searchFullContainer = true
    },
    closeSearchFullContainer () {
      this.searchFull = false
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
        this.morphSearchLoading = true
        this.$store.dispatch('search/getMorphSearchResults').then(() => {
          this.resultsVisible = true
          this.morphSearchLoading = false
        })
      } else {
        this.resultsVisible = false
      }
    },
    clearSearchField () {
      this.searchVal = ''
    },
    checkAllResults () {
      this.searchBtnLoading = true
      this.$store.dispatch('search/getSearchResults', this.searchVal).then(() => {
        this.searchBtnLoading = false
        this.closeSearchDropdown()
        this.searchFull = true
      })
    },
    openSelectionComponent () {
      this.searchFull = false
      this.searchFullContainer = false
      this.$emit('open-selection')
    }
  },
  mounted () {
    this.visible = true
    setTimeout(() => {
      this.opened = true
    }, 10)
    setTimeout(() => {
      this.loaded = true
    }, 410)
    document.body.classList.add('overflow-hidden')
    this.$once('hook:beforeDestroy', () => document.body.classList.remove('overflow-hidden'))
  }
}
</script>

<style scoped>

</style>
