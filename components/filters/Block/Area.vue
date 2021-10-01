<template>

  <div
    class="filter-item"
    :class="{'active': applicationArea.length > 0}">

    <v-popover
      trigger="click"
      :placement="position"
      class="filter-item-popup"
      popoverClass="filter-item-dropdown"
      boundariesElement="document.body">

      <div class="filter-item-selected">

        <div class="filter-item-selected-label">Область применения</div>

        <div class="filter-item-selected-value">
          <span>{{ getArraysTitle(applicationArea, applicationAreas) }}</span>
        </div>

      </div>

      <template slot="popover">

        <div class="filter-dropdown-row">

          <div class="filter-dropdown-form">

            <div class="filter-dropdown-checkboxes">

              <div
                v-for="appArea in applicationAreas"
                :key="appArea.id"
                class="filter-dropdown-checkbox">
                <div class="form-checkbox">
                  <label>
                    <input
                      type="checkbox"
                      name="price-range"
                      :value="appArea.id"
                      @change="change"
                      v-model="applicationArea">
                    <span>{{ appArea.title }}</span>
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
  applicationArea: []
}

const getInitialState = () => (initialState)

export default {
  name: 'Area',
  props: {
    position: {
      type: String,
      default: 'bottom-start'
    }
  },
  computed: {
    ...mapState({
      applicationAreas: state => state.filters.applicationAreas
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
