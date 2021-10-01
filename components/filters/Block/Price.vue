<template>

  <div
    class="filter-item"
    :class="{'active': !compareArrays(price, priceRange)}">

    <v-popover
      trigger="click"
      :placement="position"
      class="filter-item-popup"
      popoverClass="filter-item-dropdown"
      boundariesElement="document.body">

      <div class="filter-item-selected">

        <div class="filter-item-selected-label">Цена</div>

        <div
          v-if="!compareArrays(price, priceRange)"
          class="filter-item-selected-value">
          <span>{{ $options.filters.priceFilter(price[0]) }} ₽ - {{ $options.filters.priceFilter(price[1]) }} ₽</span>
        </div>

      </div>

      <template slot="popover">

        <div class="filter-dropdown-row">

          <div class="filter-dropdown-form">

            <div class="slider-range-inputs">
              <span>{{ $options.filters.priceFilter(price[0]) }} ₽ - {{ $options.filters.priceFilter(price[1]) }} ₽</span>
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
                @change="change"
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
                    <span>{{ index === 0 ? 'Все' : `${$options.filters.priceFilter(checkbox[0])} Р - ${$options.filters.priceFilter(checkbox[1])} Р` }}</span>
                  </label>
                </div>
              </div>

            </div>

          </div>

        </div>

      </template>

    </v-popover>

  </div>

</template>

<script>

let initialState = {
  price: [0, 5000000],
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
}

const getInitialState = () => (initialState)

export default {
  name: 'Price',
  props: {
    position: {
      type: String,
      default: 'bottom-start'
    }
  },
  data: () => (
    Object.assign({}, getInitialState())
  ),
  methods: {
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
    change () {
      this.$emit('change')
    },
    selectPrice (val) {
      this.price = val
      this.change()
    },
    reset () {
      Object.assign(this.$data, getInitialState())
    }
  }
}
</script>

<style scoped>

</style>
