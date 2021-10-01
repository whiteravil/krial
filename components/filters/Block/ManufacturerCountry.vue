<template>

  <div
    class="filter-item"
    :class="{'active': manufacturerCountry.length > 0}">

    <v-popover
      trigger="click"
      :placement="position"
      class="filter-item-popup"
      popoverClass="filter-item-dropdown"
      boundariesElement="document.body">

      <div class="filter-item-selected">

        <div class="filter-item-selected-label">Страна изготовитель</div>

        <div class="filter-item-selected-value">
          <span>{{ getArraysTitle(manufacturerCountry, manufacturerCountries) }}</span>
        </div>

      </div>

      <template slot="popover">

        <div class="filter-dropdown-row">

          <div class="filter-dropdown-form">

            <div class="filter-dropdown-checkboxes">

              <div
                v-for="country in manufacturerCountries"
                :key="country.id"
                class="filter-dropdown-checkbox">
                <div class="form-checkbox">
                  <label>
                    <input
                      type="checkbox"
                      name="price-range"
                      :value="country.id"
                      @change="change"
                      v-model="manufacturerCountry">
                    <span>{{ country.title }}</span>
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

import { mapState } from 'vuex'

let initialState = {
  manufacturerCountry: []
}

const getInitialState = () => (initialState)

export default {
  name: 'ManufacturerCountry',
  props: {
    position: {
      type: String,
      default: 'bottom-start'
    }
  },
  computed: {
    ...mapState({
      manufacturerCountries: state => state.filters.manufacturerCountries
    })
  },
  data: () => (
    Object.assign({}, getInitialState())
  ),
  methods: {
    change () {
      this.$emit('change')
    },
    getArraysTitle (object, array) {
      let arr = []
      object.forEach(item => {
        arr.push(array.filter(typeItem => typeItem.id === item)[0].title)
      })
      return arr.join(', ')
    },
    reset () {
      Object.assign(this.$data, getInitialState())
    }
  }
}
</script>

<style scoped>

</style>
