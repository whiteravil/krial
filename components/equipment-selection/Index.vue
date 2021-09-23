<template>

  <div class="equipment-selection-component">

    <div class="equipment-selection-body">

      <div class="equipment-selection-sidebar">

        <div
          class="search-component-close"
          @click="closeSelection">
          <span class="icon-close"></span>
        </div>

        <div class="product-selection-link">

          <div class="product-selection-link-icon">
            <span class="icon-search"></span>
          </div>

          <div class="product-selection-link-text">
            <span>Поиск по сайту</span>
          </div>

        </div>

      </div>

      <div class="equipment-selection-content">

        <div class="equipment-selection-content-title">Подбор оборудования</div>

        <div class="equipment-selection-content-body">

          <div
            v-if="hoveredProductComponent"
            class="equipment-selection-content-equipments">

            <div class="equipment-selection-main">

              <div
                class="search-selection-main-info"
                :class="{'hide': hoveredProduct !== 0}">

                <div class="h1">{{ selectionProducts.title }}</div>
                <img :src="selectionProducts.imgSrc" alt="">

              </div>

              <div
                v-for="product in selectionProducts.list"
                :key="product.id"
                class="search-selection-hover-info"
                :class="{'active': product.id === hoveredProduct}">
                <div class="h2">{{ product.title }}</div>
                <ul
                  v-if="product.advantages.length > 0">
                  <li
                    v-for="(adv, index) in product.advantages"
                    :key="index">
                    {{ adv }}
                  </li>
                </ul>
                <img :src="product.imgSrc" alt="">
              </div>

            </div>

            <div class="equipment-selection-footer">

              <div class="search-selection-products-list">

                <div
                  v-for="product in selectionProducts.list"
                  :key="product.id"
                  class="search-selection-product">

                  <a
                    @mouseover="selectionProductHover(product.id)"
                    :href="product.url"
                    @click="openEquipmentSelectionSearch">
                    {{ product.title }}
                  </a>

                </div>

              </div>

            </div>

          </div>

          <div
            v-if="equipmentSelectionSearch"
            class="equipment-selection-group">

            <div class="equipment-selection-selected">

              <div class="search-selection-hover-info active">
                <div class="h2">{{ selectedProduct.title }}</div>
                <ul
                  v-if="selectedProduct.advantages ? selectedProduct.advantages.length > 0 : false">
                  <li
                    v-for="(adv, index) in selectedProduct.advantages"
                    :key="index">
                    {{ adv }}
                  </li>
                </ul>
                <img :src="selectedProduct.imgSrc" alt="">
              </div>

            </div>

            <Filters />

          </div>

        </div>

      </div>

    </div>

  </div>

</template>

<script>

import { mapState } from 'vuex'

export default {
  name: 'Index',
  computed: {
    ...mapState({
      selectionProducts: state => state.selectionProducts,
      selectedProduct: state => state.selectionProducts.selected
    })
  },
  data: () => ({
    hoveredProduct: 0,
    hoveredProductComponent: true,
    equipmentSelection: false
  }),
  methods: {
    closeSelection () {
      console.log(false)
    },
    selectionProductHover (id) {
      this.hoveredProduct = id
    }
  },
  mounted () {
    this.$store.dispatch('selectionProducts/getSelectionProducts')
    this.$store.commit('selectionProducts/setSelectedProduct', 1)
  }
}
</script>

<style scoped>

</style>
