<template>

  <div class="filters-component">

    <div class="filters-header">

      <div class="filter-checkboxes">

        {{term}}

        <vue-slider
          v-model="term"
          :min="0"
          :max="10000" />

      </div>

    </div>

  </div>

</template>

<script>

import { mapState } from 'vuex'
import VueSlider from 'vue-slider-component'
import 'vue-slider-component/theme/default.css'

export default {
  name: 'Index',
  components: {
    VueSlider
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
    term: 0
  }),
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
