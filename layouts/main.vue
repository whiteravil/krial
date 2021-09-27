<template>

  <div class="wrapper">

    <LayoutsHeader
      :visibleLogo="false"
      :classes="['fixed', 'light']"/>

    <Nuxt />

    <LayoutsFooter />

  </div>

</template>

<script>

export default {
  name: 'Main',
  mounted () {
    this.$store.dispatch('globalVars/getGlobalVars')
  }
}
</script>

<style scoped>

</style>
