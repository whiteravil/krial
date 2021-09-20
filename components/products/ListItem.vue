<template>

  <div class="press-center-result">

    <div class="h3">
      <a :href="product.url">
        {{ product.title }}
      </a>
    </div>

    <p>
      {{ product.descr }}
    </p>

    <a
      :href="product.url"
      class="link">Подробнее</a>

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
