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

            <div class="search-results-full-body">

              <div class="search-results-equipments-header">
                <div class="search-results-equipments-header-th">
                  <span>200 кВт (250 кВА)</span>
                </div>
                <div class="search-results-equipments-header-th">Мощность макс.</div>
                <div class="search-results-equipments-header-th">Производитель</div>
                <div class="search-results-equipments-header-th">Расход топлива (75%)</div>
                <div class="search-results-equipments-header-th">Цена</div>
              </div>

              <div class="search-results-equipments-list">

                <div
                  v-for="searchItem in searchResultsEquipments"
                  :key="searchItem.id"
                  class="search-results-equipment">

                  <div class="equipment-main">

                    <div class="equipment-img">
                      <a :href="searchItem.url">
                        <img :src="searchItem.imgSrc" alt="">
                      </a>
                    </div>

                    <div class="equipment-title">
                      <div class="h4">
                        <a :href="searchItem.url">
                          {{ searchItem.title }}
                        </a>
                      </div>
                      <div class="equipment-tags">
                        <div
                          v-for="tag in searchItem.tags"
                          :key="tag"
                          class="tag">
                          {{ tag }}
                        </div>
                      </div>
                    </div>

                  </div>

                  <div class="equipment-power">
                    {{ searchItem.maxPower }} кВт
                  </div>

                  <div class="equipment-manufacturer">
                    <span>{{ searchItem.manufacturer.name }}</span>
                    <img :src="searchItem.manufacturer.imgSrc" alt="">
                  </div>

                  <div class="equipment-fuel-consumption">
                    {{ searchItem.fuelConsumption }} л/ч
                  </div>

                  <div class="equipment-parameters">

                    <v-popover trigger="hover" placement="bottom-start">

                      <span class="tooltip-exc icon-exc"></span>

                      <template slot="popover">
                        <div class="info-hover-dropdown">
                          <ul>
                            <li>
                              <span>Мощность макс. кВт.</span>
                              <span>{{ searchItem.maxPower }}</span>
                            </li>
                            <li>
                              <span>Двигатель</span>
                              <span>{{ searchItem.manufacturer.name }}</span>
                            </li>
                            <li>
                              <span>Частота вращения ,об/мин</span>
                              <span>{{ searchItem.rotationFrequency }}</span>
                            </li>
                            <li>
                              <span>Объём двигателя, л</span>
                              <span>{{ searchItem.engineVolume }}</span>
                            </li>
                            <li>
                              <span>Коэффициент мощности</span>
                              <span>{{ searchItem.powerFactor }}</span>
                            </li>
                            <li>
                              <span>Напряжение, В</span>
                              <span>{{ searchItem.voltage }}</span>
                            </li>
                            <li>
                              <span>Номинальная частота тока, Гц</span>
                              <span>{{ searchItem.currentFrequency }}</span>
                            </li>
                          </ul>
                        </div>
                      </template>

                    </v-popover>

                  </div>

                  <div class="equipment-price">
                    <div class="price-sum">{{ $options.filters.priceFilter(searchItem.price) }} ₽</div>
                    <p>В наличии  — обновлено {{ parseDate(searchItem.updateDate) }}</p>
                  </div>

                  <div class="equipment-more">
                    <a :href="searchItem.url" class="btn btn-secondary">Подробнее</a>
                  </div>

                  <div class="equipment-liked">
                <span
                  class="liked-btn"
                  :class="{'active': searchItem.liked}" />
                  </div>

                </div>

              </div>

            </div>

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

</template>

<script>

import moment from 'moment'
import { mapState } from 'vuex'

import { VPopover } from 'v-tooltip'

export default {
  name: 'FullResults',
  components: {
    VPopover
  },
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
    parseDate (date) {
      let dateMoment = moment(date).locale('ru')
      let currDate = moment(new Date())
      let returnDate = dateMoment.format('DD MMMM')
      if (currDate.year() > dateMoment.year()) {
        returnDate = dateMoment.format('DD MMMM YYYY') + ' года'
      }
      if (currDate.day() === dateMoment.day()) {
        returnDate = 'сегодня'
      }
      return returnDate
    },
    selectTab (id) {
      this.selectedTabs = id
    }
  },
  mounted () {
    // УДАЛИ КОГДА СДЕЛАЕШЬ
    this.$store.dispatch('search/getSearchResults')
    // УДАЛИ КОГДА СДЕЛАЕШЬ
  }
}
</script>

<style scoped>

</style>
