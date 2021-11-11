<template>

  <div class="press-center-result">

    <div class="h3">
      <nuxt-link :to="product.url">
        {{ product.title }}
      </nuxt-link>
    </div>

    <p>
      {{ product.descr }}
    </p>

    <nuxt-link
      :to="product.url"
      class="link">Подробнее</nuxt-link>

  </div>

</template>

<script>
export default {
  name: 'ListItem',
  props: {
    product: Object
  }
}
</script>

<style scoped>

</style>
