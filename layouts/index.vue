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
  name: 'Index'
}
</script>

<style scoped>

</style>
