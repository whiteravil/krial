<template>

  <div class="filters-component">

    <div
      v-if="!disableType"
      class="filters-header">

      <div class="filter-checkboxes">

        <div
          v-for="checkbox in types"
          :key="checkbox.id"
          class="label-checkbox">
          <label>
            <input
              type="checkbox"
              :value="checkbox.id"
              v-model="type">
            <span>
              {{ checkbox.title }}
            </span>
          </label>
        </div>

      </div>

      <div class="filter-clear">
        <a
          href="#"
          class="clear-btn"
          @click="resetFilter">
          <span class="icon-close-small"></span> Очистить фильтр
        </a>
      </div>

    </div>

    <div class="filters-body">

      <FiltersBlockPowerBig
        ref="filtersBlockPowerBig"
        @change="getSearchResults"/>

      <div class="filter-right">

        <div class="filters-selects">

          <FiltersBlockPrice
            ref="filtersBlockPrice"
            @change="getSearchResults"/>

          <FiltersBlockClass
            ref="filtersBlockClass"
            @change="getSearchResults"/>

          <FiltersBlockEngine
            ref="filtersBlockEngine"
            @change="getSearchResults"/>

          <FiltersBlockArea
            ref="filtersBlockArea"
            @change="getSearchResults"/>

        </div>

      </div>

    </div>

    <div
      v-if="!withSort"
      class="filters-footer">

      <div
        v-if="filterResults.length > 0"
        class="filters-results">
        Найдено {{ filterResults.length }} {{ $options.filters.declensionNumbers(filterResults.length, ['позиция', 'позиции', 'позиций']) }}
      </div>

      <div class="filters-btn">
        <button class="btn btn-sm btn-white">Помощь с выбором</button>
        <button
          class="btn btn-sm"
          :class="{'loading': load}"
          @click="$emit('show-results')">
          Показать {{ filterResults.length }} {{ $options.filters.declensionNumbers(filterResults.length, ['позиция', 'позиции', 'позиций']) }}
        </button>
      </div>

    </div>

    <div
      v-if="withSort"
      class="sort-block">

      <div class="sort-extended">
        <a href="#">Расширенный поиск</a>
      </div>

      <div class="sort-btns">

        <div class="sort-select-component">
          <div class="sort-select-component-title">Сортировать</div>
          <FiltersSortSelect
            :list="sorts"
            :selected="selectedSort"
            @selectItem="selectedSort = $event"
            @change="getSearchResults" />
        </div>

        <div class="filter-clear">
          <a
            href="#"
            class="clear-btn"
            @click="resetFilter">
            <span class="icon-close-small"></span> Очистить фильтр
          </a>
        </div>

      </div>

    </div>

  </div>

</template>

<script>

import { mapState } from 'vuex'

let initialState = {
  type: [],
  load: false,
  selectedSort: 0
}

const getInitialState = () => (initialState)

export default {
  name: 'Index',
  computed: {
    ...mapState({
      types: state => state.filters.types,
      filterResults: state => state.filters.filterResults,
      sorts: state => state.filters.sorts
    })
  },
  props: {
    disableType: {
      type: Boolean,
      default: false
    },
    withSort: {
      type: Boolean,
      default: false
    }
  },
  data: () => (
    Object.assign({}, getInitialState())
  ),
  methods: {
    resetFilter () {
      this.$refs.filtersBlockPowerBig.reset()
      this.$refs.filtersBlockPrice.reset()
      this.$refs.filtersBlockClass.reset()
      this.$refs.filtersBlockEngine.reset()
      this.$refs.filtersBlockArea.reset()
      Object.assign(this.$data, getInitialState())
      this.getSearchResults()
    },
    getSearchResults () {
      this.$emit('loaded', true)
      if (!this.load) {
        this.load = true
        this.$store.dispatch('filters/getFilterResults').then(() => {
          this.load = false
          this.$emit('loaded', false)
        })
      }
    }
  },
  mounted () {
    this.$store.dispatch('filters/getFilterAllTypes')
    this.$store.dispatch('filters/getFilterAllClasses')
    this.$store.dispatch('filters/getFilterAllApplicationAreas')
    this.$store.dispatch('filters/getFilterAllEngines')
    this.getSearchResults()
    this.$store.dispatch('filters/getSorts').then(() => {
      initialState.selectedSort = this.sorts[0].id
      this.selectedSort = this.sorts[0].id
    })
  }
}
</script>

<style scoped>

</style>
