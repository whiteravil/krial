<template>

  <div class="filter-second-component">

    <FiltersBlockCategory
      position="bottom-end"/>

    <FiltersBlockPower
      position="bottom-end"/>

    <FiltersBlockManufacturer
      position="bottom-end"/>

    <FiltersBlockEngine
      position="bottom-end"/>

    <FiltersBlockManufacturerCountry
      position="bottom-end"/>

    <div class="filter-second-btn">
      <button class="btn btn-with-icon">Подобрать оборудование <span class="icon-arrow-right"></span></button>
    </div>

  </div>

</template>

<script>

export default {
  name: 'Category',
  data: () => ({}),
  methods: {},
  mounted () {
    this.$store.dispatch('catalogCategory/getCatalogCategories')
    this.$store.dispatch('filters/getFilterAllEngines')
    this.$store.dispatch('filters/getFilterAllManufacturers')
    this.$store.dispatch('filters/getFilterAllManufacturerCountries')
  }
}
</script>

<style scoped>

</style>
