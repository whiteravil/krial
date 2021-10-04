<template>

  <div class="categories-component">

    <no-ssr>

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
          v-for="item in list"
          :key="item.id"
          v-masonry-tile
          class="category-product-item">

          <div class="category-product-item-content">
            <div class="h3">
              <a :href="item.url">
                {{ item.title }}
              </a>
            </div>
            <ul v-if="item.subcategories.length">
              <li
                v-for="subItem in item.subcategories"
                :key="subItem.id">
                <a :href="subItem.url">
                  {{ subItem.title }}
                </a>
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

    </no-ssr>

  </div>

</template>

<script>

import NoSSR from 'vue-no-ssr'

export default {
  name: 'CategoryItems',
  components: {
    'no-ssr': NoSSR
  },
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
