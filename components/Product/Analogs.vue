<template>
  <section class="s-analogs">

    <div class="section-title with-nav">
      <div class="h3">Аналоги</div>
    </div>

    <div class="analogs">

      <swiper
        ref="slider"
        :options="swiperOptions"
        @ready="sliderInit">

        <swiper-slide
          v-for="slide in list"
          :key="slide.id">

          <ProductsGridView
            ref="product"
            :withBorder="true"
            :item="slide"/>

        </swiper-slide>

      </swiper>

      <div class="analogs-slider-button-prev slider-prev"><span class="icon-angle-left" /></div>
      <div class="analogs-slider-button-next slider-next"><span class="icon-angle-right"/></div>

    </div>

  </section>
</template>

<script>

import { mapState } from 'vuex'
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'

export default {
  name: 'ProductAnalogs',
  components: {
    Swiper,
    SwiperSlide
  },
  computed: {
    ...mapState({
      list: state => state.analogs.list
    }),
    slider () {
      return this.$refs.slider.$swiper
    },
    product () {
      return this.$refs.product
    }
  },
  data: () => ({
    swiperOptions: {
      slidesPerView: 3,
      spaceBetween: 33,
      speed: 600,
      navigation: {
        nextEl: '.analogs-slider-button-next',
        prevEl: '.analogs-slider-button-prev'
      }
    }
  }),
  methods: {
    sliderInit () {
      this.product.forEach(product => product.setStickWidth())
    }
  }
}
</script>

<style scoped>

</style>
