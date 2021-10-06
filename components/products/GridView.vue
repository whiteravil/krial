<template>

  <div class="catalog-item">

    <div class="catalog-item-top">

      <div class="catalog-item-tags">
        <span
          v-for="tag in item.tags"
          :key="tag.id"
          v-text="tag"/>
      </div>

      <div class="catalog-item-flag">
        <img
          :src="item.manufacturer.imgSrc"
          alt="">
      </div>

      <div class="catalog-item-img">
        <img
          :src="item.imgSrc"
          alt="">
      </div>

      <div class="catalog-item-price">
        <div class="catalog-item-price-value">{{ item.price | priceFilter }} ₽</div>
      </div>

      <div class="catalog-item-">

      </div>

    </div>

  </div>

</template>

<script>
export default {
  name: 'GridView',
  props: {
    item: Object
  }
}
</script>

<style scoped>

</style>
