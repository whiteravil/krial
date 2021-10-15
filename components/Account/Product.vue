<template>
  <div class="basket-sm-item">
    <div class="basket-sm-item-img">
      <a :href="item.url">
        <img
          :src="item.imgSrc"
          alt="">
      </a>
    </div>
    <div class="basket-sm-item-content">
      <div class="basket-sm-item-title">
        <a :href="item.url">
          {{ item.title }}
        </a>
      </div>
      <div class="basket-sm-item-price">
        {{ item.price | priceFilter }} ₽
      </div>
    </div>
    <div
      class="basket-sm-item-remove"
      @click="$emit('remove')"/>
  </div>
</template>

<script>
export default {
  props: {
    item: Object
  },
  name: 'Product'
}
</script>

<style scoped>

</style>
