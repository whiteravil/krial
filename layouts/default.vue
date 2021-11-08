<template>

  <div class="wrapper">

    <LayoutsHeader/>

    <Nuxt/>

    <LayoutsFooter :withMenu="true"/>

  </div>

</template>

<script>
export default {
  name: 'default.vue'
}
</script>

<style scoped>

</style>
