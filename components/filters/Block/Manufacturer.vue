<template>

  <div
    class="filter-item"
    :class="{'active': manufacturer.length > 0}">

    <v-popover
      trigger="click"
      :placement="position"
      class="filter-item-popup"
      popoverClass="filter-item-dropdown"
      boundariesElement="document.body">

      <div class="filter-item-selected">

        <div class="filter-item-selected-label">Производитель</div>

        <div class="filter-item-selected-value">
          <span>{{ getArraysTitle(manufacturer, manufacturers) }}</span>
        </div>

      </div>

      <template slot="popover">

        <div class="filter-dropdown-row">

          <div class="filter-dropdown-form">

            <div class="filter-dropdown-checkboxes">

              <div
                v-for="manufacturerItem in manufacturers"
                :key="manufacturerItem.id"
                class="filter-dropdown-checkbox">
                <div class="form-checkbox">
                  <label>
                    <input
                      type="checkbox"
                      name="price-range"
                      :value="manufacturerItem.id"
                      @change="change"
                      v-model="manufacturer">
                    <span>{{ manufacturerItem.title }}</span>
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

</template>

<script>

import { mapState } from 'vuex'

let initialState = {
  manufacturer: []
}

const getInitialState = () => (initialState)

export default {
  name: 'Manufacturer',
  props: {
    position: {
      type: String,
      default: 'bottom-start'
    }
  },
  computed: {
    ...mapState({
      manufacturers: state => state.filters.manufacturers
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
