<template>

  <div class="categories-component">

    <div
      v-masonry
      transition-duration=".4s"
      item-selector=".category-product-item"
      column-width=".category-product-sizer"
      gutter=".category-product-gutter"
      horizontal-order="true"
      destroy-delay="0"
      stagger="0.03s"
      class="categories-row">

      <div class="category-product-sizer"></div>
      <div class="category-product-gutter"></div>

      <div
        v-masonry-tile
        v-for="item in list"
        :key="item.id"
        class="category-product-item"
        :class="`type-${item.type ? item.type : 1}`">

        <div class="category-product-item-content">
          <div class="h3">
            <nuxt-link :to="item.url">
              {{ item.title }}
            </nuxt-link>
          </div>
          <ul v-if="item.subcategories.length">
            <li
              v-for="subItem in item.subcategories"
              :key="subItem.id">
              <nuxt-link :to="subItem.url">
                {{ subItem.title }}
              </nuxt-link>
            </li>
          </ul>
        </div>

        <div
          v-if="item.imgSrc && typeof item.imgSrc === 'string' ? item.length !== 0 : false"
          class="category-product-item-img">
          <img
            :src="item.imgSrc"
            alt="">
        </div>

      </div>

    </div>

  </div>

</template>

<script>

export default {
  name: 'CategoryItems',
  props: {
    list: Array
  },
  mounted () {
    if (typeof this.$redrawVueMasonry === 'function') {
      this.$redrawVueMasonry()
    }
  }
}
</script>

<style scoped>

</style>
