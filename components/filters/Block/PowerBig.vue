<template>

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
          @change="change"
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
            <span>{{ radio[0] }}-{{ radio[1] }} кВт</span>
          </label>
        </div>
      </div>

    </div>

  </div>

</template>

<script>

let initialState = {
  power: [200, 300],
  powerRange: [0, 2500],
  helpPowerArray: [
    [100, 200],
    [200, 300],
    [300, 500],
    [500, 1000],
    [1000, 2500]
  ]
}

const getInitialState = () => (initialState)

export default {
  name: 'PowerBig',
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
