<template>

  <CatalogMainWindow/>

</template>

<script>

export default {
  name: 'catalog.vue',
  mounted () {
    console.log(this.$route.params.id)
  }
}
</script>
