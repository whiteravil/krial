<template>

  <div class="articles-slider">

    <swiper
      ref="slider"
      :options="swiperOptions">

      <swiper-slide
        v-for="slide in list"
        :key="slide.id">

        <Article :item="slide"/>

      </swiper-slide>

    </swiper>

    <div class="articles-slider-button-prev slider-prev"><span class="icon-angle-left" /></div>
    <div class="articles-slider-button-next slider-next"><span class="icon-angle-right" /></div>

  </div>

</template>

<script>

import { Swiper, SwiperSlide } from 'vue-awesome-swiper'

export default {
  name: 'ArticlesSlider',
  components: {
    Swiper,
    SwiperSlide
  },
  props: {
    list: Array
  },
  data: () => ({
    swiperOptions: {
      slidesPerView: 3,
      spaceBetween: 25,
      speed: 600,
      navigation: {
        nextEl: '.articles-slider-button-next',
        prevEl: '.articles-slider-button-prev'
      }
    }
  })
}
</script>

<style scoped>

</style>
