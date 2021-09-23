<template>

  <div class="filters-component">

    <div class="filters-header">

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

      <div class="filters-slider-range-big">

        <div class="slider-range-label">Мощность</div>

        <div class="slider-range-big">

          <div class="slider-range-inputs">
            <span>{{ power[0] }} — {{ power[1] }} кВт</span>
          </div>

          <div class="slider-range">
            <vue-slider
              ref="slider"
              :min="powerRange[0]"
              :max="powerRange[1]"
              tooltip="none"
              :dotSize="17"
              :interval="50"
              :height="2"
              v-model="power"/>
          </div>

          <div class="slider-help-radio">
            <div
              v-for="(radio, index) in helpPowerArray"
              :key="index"
              class="label-checkbox">
              <label>
                <input
                  type="radio"
                  name="help-power-radio"
                  :value="radio"
                  :checked="compareArrays(power, radio)"
                  @change="selectPower(radio)">
                <span>
                  {{ radio[0] }}-{{ radio[1] }} кВт
                </span>
              </label>
            </div>
          </div>

        </div>

      </div>

      <div class="filter-right">

        <div class="filters-selects">

          <div class="filter-item">

            <v-popover
              trigger="click"
              placement="bottom-start"
              @show="priceOpened = true"
              @hide="priceOpened = false"
              class="filter-item-popup"
              popoverClass="filter-item-dropdown">

              <div class="filter-item-selected">

                <div class="filter-item-selected-label">Цена</div>

                <div class="filter-item-selected-value">
                  <span>{{ $options.filters.priceFilter(price[0]) }} ₽ - {{ $options.filters.priceFilter(price[1]) }} ₽</span>
                </div>

              </div>

              <template slot="popover">

                <div class="filter-dropdown-row">

                  <div class="filter-dropdown-form">

                    <div class="slider-range-inputs">
                      <span>
                        {{ $options.filters.priceFilter(price[0]) }} ₽ - {{ $options.filters.priceFilter(price[1]) }} ₽
                      </span>
                    </div>

                    <div class="slider-range">
                      <vue-slider
                        ref="slider"
                        :min="priceRange[0]"
                        :max="priceRange[1]"
                        tooltip="none"
                        :dotSize="13"
                        :interval="5000"
                        :height="2"
                        v-model="price"/>
                    </div>

                    <div class="filter-dropdown-checkboxes">

                      <div
                        v-for="(checkbox, index) in helpPriceArray"
                        :key="index"
                        class="filter-dropdown-checkbox">
                        <div class="form-checkbox">
                          <label>
                            <input
                              type="radio"
                              name="price-range"
                              :value="checkbox"
                              :checked="compareArrays(price, checkbox)"
                              @change="selectPrice(checkbox)">
                            <span>
                              {{ index === 0 ? 'Все' : `${$options.filters.priceFilter(checkbox[0])} Р - ${$options.filters.priceFilter(checkbox[1])} Р` }}
                            </span>
                          </label>
                        </div>
                      </div>

                    </div>

                  </div>

                </div>

              </template>

            </v-popover>

          </div>

          <div class="filter-item">

            <v-popover
              trigger="click"
              placement="bottom-start"
              @show="priceOpened = true"
              @hide="priceOpened = false"
              :boundariesElement="document.body"
              class="filter-item-popup"
              popoverClass="filter-item-dropdown">

              <div class="filter-item-selected">

                <div class="filter-item-selected-label">Тип</div>

                <div class="filter-item-selected-value">
                  <span>
                    {{ getSelectedTypes() }}
                  </span>
                </div>

              </div>

              <template slot="popover">

                <div class="filter-dropdown-row">

                  <div class="filter-dropdown-form">

                    <div class="filter-dropdown-checkboxes">

                      <div
                        v-for="typeItem in types"
                        :key="typeItem.id"
                        class="filter-dropdown-checkbox">
                        <div class="form-checkbox">
                          <label>
                            <input
                              type="checkbox"
                              name="price-range"
                              :value="typeItem.id"
                              v-model="type">
                            <span>
                              {{ typeItem.title }}
                            </span>
                          </label>
                        </div>
                      </div>

                    </div>

                  </div>

                  <div class="filter-dropdown-info">

                    <span class="icon-exc"></span>

                    <p>Выбрать правильную мощность непросто. Для этого нужно обладать хотя бы базовыми познаниями в электротехнике.<br>В противном случае лучше обратиться к специалистам, иначе можно запутаться в терминах и цифрах.</p>

                  </div>

                </div>

              </template>

            </v-popover>

          </div>

        </div>

      </div>

    </div>

  </div>

</template>

<script>

import { mapState } from 'vuex'
import { VPopover } from 'v-tooltip'

export default {
  name: 'Index',
  components: {
    VPopover
  },
  computed: {
    ...mapState({
      types: state => state.filters.types,
      classes: state => state.filters.classes,
      applicationAreas: state => state.filters.applicationAreas,
      engines: state => state.filters.engines
    })
  },
  data: () => ({
    type: [1],
    power: [200, 300],
    powerRange: [0, 2500],
    helpPowerArray: [
      [100, 200],
      [200, 300],
      [300, 500],
      [500, 1000],
      [1000, 2500]
    ],
    price: [300000, 600000],
    priceRange: [0, 5000000],
    helpPriceArray: [
      [0, 5000000],
      [25000, 50000],
      [50000, 100000],
      [100000, 250000],
      [250000, 500000],
      [500000, 1000000],
      [1000000, 2500000],
      [2500000, 5000000]
    ]
  }),
  methods: {
    resetFilter () {
      console.log(123321)
    },
    selectPower (val) {
      this.power = val
    },
    selectPrice (val) {
      this.price = val
    },
    compareArrays (arr1, arr2) {
      if (arr1.length !== arr2.length) {
        return false
      }
      for (let i = 0; i < arr1.length; i++) {
        if (arr1[i] !== arr2[i]) {
          return false
        }
      }
      return true
    },
    getSelectedTypes () {
      let arr = []
      this.type.forEach(item => {
        // arr.push(this.types.filter(typeItem => typeItem.id === item)[0].title)
      })
      return arr.join(', ')
    },
    openFilterParent (e) {
      console.log(e)
    }
  },
  mounted () {
    this.$store.dispatch('filters/getFilterAllTypes')
    this.$store.dispatch('filters/getFilterAllClasses')
    this.$store.dispatch('filters/getFilterAllApplicationAreas')
    this.$store.dispatch('filters/getFilterAllEngines')
  }
}
</script>

<style scoped>

</style>
