<template>

  <section class="s-main-window">
    <div class="container">

      <div class="main-window">

        <div class="main-window-left">

          <div class="page-title">
            <div class="h6">Каталог</div>
            <h1 v-html="title"/>
          </div>

          <div class="main-window-btns">
            <a href="#" class="btn">Помощь с подбором</a>
            <a
              v-if="downloadButton"
              href="#"
              class="btn btn-border btn-with-icon">Скачать материалы <span class="icon-download"></span></a>
          </div>

        </div>

        <div class="main-window-right">

          <div class="main-slider-title">
            {{ sliderTitle }}
          </div>

          <div class="main-slider swiper-container">

            <swiper ref="mySwiper" :options="swiperOptions">

              <swiper-slide
                v-for="slide in slideList"
                :key="slide.id">
                <div class="main-slider--slide">

                  <div class="h4">{{slide.title}}</div>
                  <img :src="slide.imgSrc" alt="">

                  <div class="info-link">
                    <v-popover
                      placement="right-start"
                      boundariesElement="document.body">

                      <div class="info-link-btn"></div>

                      <template slot="popover">
                        <div class="info-hover-dropdown wide">
                          <p>Мы имеем опыт поставки сложных комплексов в отдаленные северные регионы.</p>
                          <p>Вы можете заказать у нас небольшие стационарные и передвижные генераторы с тепло-,шумоизоляцией, в кожухах, утепленных контейнерах.</p>
                        </div>
                      </template>

                    </v-popover>
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

export default {
  name: 'MainWindow',
  components: {
    Swiper,
    SwiperSlide
  },
  props: {
    title: String,
    sliderTitle: String,
    slideList: Array,
    downloadButton: {
      type: Boolean,
      default: true
    }
  },
  directives: {
    swiper: directive
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
