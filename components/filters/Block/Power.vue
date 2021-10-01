<template>

  <div
    class="filter-item"
    :class="{'active': !compareArrays(power, powerRange)}">

    <v-popover
      trigger="click"
      :placement="position"
      class="filter-item-popup"
      popoverClass="filter-item-dropdown"
      boundariesElement="document.body">

      <div class="filter-item-selected">

        <div class="filter-item-selected-label">Мощность</div>

        <div
          v-if="!compareArrays(power, powerRange)"
          class="filter-item-selected-value">
          <span>{{ power[0] }} - {{ power[1] }} кВт</span>
        </div>

      </div>

      <template slot="popover">

        <div class="filter-dropdown-row">

          <div class="filter-dropdown-form">

            <div class="slider-range-inputs">
              <span>{{ power[0] }} — {{ power[1] }} кВт</span>
            </div>

            <div class="slider-range">
              <vue-slider
                ref="slider"
                :min="powerRange[0]"
                :max="powerRange[1]"
                tooltip="none"
                :dotSize="13"
                :interval="10"
                :height="2"
                @change="change"
                v-model="power"/>
            </div>

            <div class="filter-dropdown-checkboxes">

              <div
                v-for="(checkbox, index) in helpPowerArray"
                :key="index"
                class="filter-dropdown-checkbox">
                <div class="form-checkbox">
                  <label>
                    <input
                      type="radio"
                      name="power-range"
                      :value="checkbox"
                      :checked="compareArrays(power, checkbox)"
                      @change="selectPower(checkbox)">
                    <span>{{ index === 0 ? 'Все' : `${ checkbox[0] } — ${ checkbox[1] } кВт` }}</span>
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

let initialState = {
  selectedEquipment: 0,
  power: [0, 2500],
  powerRange: [0, 2500],
  helpPowerArray: [
    [0, 2500],
    [100, 200],
    [200, 300],
    [300, 500],
    [500, 1000],
    [1000, 2500]
  ],
  manufacturer: [],
  engine: [],
  manufacturerCountry: [],
  load: false
}

const getInitialState = () => (initialState)

export default {
  name: 'Category',
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
    change () {
      this.$emit('change')
    },
    selectPower (val) {
      this.power = val
      this.change()
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
    reset () {
      Object.assign(this.$data, getInitialState())
    }
  }
}
</script>

<style scoped>

</style>
