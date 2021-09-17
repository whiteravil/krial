<template>

  <div class="wrapper">

    <LayoutsHeader :visibleLogo="false"/>

    <Nuxt />

    <LayoutsFooter />

  </div>

</template>

<script>

export default {
  name: 'main',
  mounted () {
    this.$store.dispatch('globalVars/getGlobalVars')
  }
}
</script>

<style scoped>

</style>
