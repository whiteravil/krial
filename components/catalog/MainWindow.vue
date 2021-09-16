<template>

  <section class="s-main-window">
    <div class="container">

      <div class="main-window">

        <div class="main-window-left">

          <div class="page-title">
            <div class="h6">Каталог</div>
            <h1 v-html="pageTitle" />
          </div>

          <div class="main-window-btns">
            <a href="#" class="btn">Помощь с подбором</a>
            <a href="#" class="btn btn-border btn-with-icon">Скачать материалы <span class="icon-download"></span></a>
          </div>

        </div>

        <div class="main-window-right">

          <div class="main-slider-title">{{advantages.title}}</div>

          <div class="main-slider swiper-container">

            <swiper ref="mySwiper" :options="swiperOptions">

              <swiper-slide
                v-for="advantage in advantages.list"
                :key="advantage.id">
                <div class="main-slider--slide">
                  <div class="h4">{{advantage.title}}</div>
                  <img :src="advantage.imgSrc" alt="">
                  <div class="info-link">
                    <div class="info-link-btn"></div>
                  </div>
                </div>
              </swiper-slide>

              <div class="swiper-pagination" slot="pagination"></div>

            </swiper>

            <div class="main-slider-button main-slider-button-prev"><span class="icon-angle-left"></span></div>
            <div class="main-slider-button main-slider-button-next"><span class="icon-angle-right"></span></div>

          </div>

        </div>

      </div>

    </div>
  </section>

</template>

<script>

import { Swiper, SwiperSlide, directive } from 'vue-awesome-swiper'
import { mapState } from 'vuex'

export default {
  name: 'MainWindow',
  components: {
    Swiper,
    SwiperSlide
  },
  directives: {
    swiper: directive
  },
  computed: {
    ...mapState({
      pageTitle: state => state.catalog.pageTitle,
      advantages: state => state.catalog.catalogAdvantages
    })
  },
  data: () => ({
    swiperOptions: {
      slidesPerView: 3,
      spaceBetween: 20,
      navigation: {
        nextEl: '.main-slider-button-next',
        prevEl: '.main-slider-button-prev'
      }
    }
  })
}
</script>

<style scoped>

</style>
