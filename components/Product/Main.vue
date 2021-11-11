<template>
  <section class="s-product-main">

    <div class="product-main-row">

      <div class="product-main-left">

        <h1>{{ title }}</h1>

        <div class="product-main-features">

          <div class="product-main-feature">
            <div class="h6">Мощность макс.</div>
            <p>{{ maxPower | priceFilter }} кВт</p>
          </div>

          <div class="product-main-feature">
            <div class="h6">Двигатель</div>
            <p>{{ engineModel }} <img :src="manufacturer.imgSrc" alt=""></p>
          </div>

        </div>

        <div class="product-main-descr">
          <div class="product-main-descr-content">
            <VueSlideToggle
              :open="descrVisible"
              :duration="500"
              v-html="descr"/>
          </div>
          <div class="product-main-descr-more">
            <span @click="descrVisible = !descrVisible">{{ descrVisible ? 'Скрыть' : 'Подробнее' }}</span>
          </div>
        </div>

        <div class="product-price">
          {{ price | priceFilter }} ₽
        </div>

        <div class="product-in-stock">

          <div class="product-in-stock-info">{{ getAvailability(availability) }} — обновлено {{ updateDate | parseDate }}</div>

          <div class="product-in-stock-dynamic">
            <a href="#"><span>Динамика цены</span><span class="icon-dynamic"></span></a>
          </div>

        </div>

      </div>

      <div class="product-main-right">

        <div class="product-types">
          <div
            v-for="type in types"
            :key="type.id"
            class="radio-stick">
            <label>
              <input
                type="radio"
                name="product-type"
                :value="type.id"
                v-model="selectedType">
              <span>{{ type.title }}</span>
            </label>
          </div>
        </div>

        <div class="product-gallery">

          <div class="product-images-gallery">
            <img
              v-for="img in images"
              :key="img.id"
              :src="img.imgSrc"
              :class="{'active': activeSlide === img.id}"
              alt="">
          </div>

          <div class="product-thumbs-gallery">

            <swiper
              ref="swiper"
              :options="swiperOptions">
              <swiper-slide
                v-for="img in images"
                :key="img.id">
                <img
                  :src="img.imgSrc"
                  :class="{'active': activeSlide === img.id}"
                  @click="activeSlide = img.id"
                  alt="">
              </swiper-slide>
            </swiper>

            <div class="gallery-thumbs-nav">

              <span
                class="gallery-thumb-prev"
                @click="prevImg">
                <span class="icon-angle-up"/>
              </span>

              <span
                class="gallery-thumb-next"
                @click="nextImg">
                <span class="icon-angle-down"/>
              </span>

            </div>

          </div>

        </div>

        <div class="product-delivery">
          <div class="product-delivery-title">Доставка в {{ currentCity }}</div>
          <div class="product-delivery-info">{{ delivery.date | parseDate }} — от {{ delivery.price | priceFilter }} руб</div>
        </div>

        <div class="product-exact-cost">
          <a href="#">Рассчитать точную стоимость</a>
        </div>

      </div>

    </div>

    <div class="product-main-btns">
      <div class="product-main-btns-configurator">
        <button class="btn btn-light-gray btn-lg btn-icon btn-block">конфигуратор опций <span class="icon-filter-2"></span></button>
      </div>
      <div class="product-main-btns-order">
        <button class="btn btn-orange btn-lg btn-icon btn-block">добавить в заказ <span class="icon-cart"></span></button>
      </div>
      <div class="product-main-btns-compare">
        <button class="btn btn-lg btn-icon btn-block">К сравнению <span class="icon-plus-circle"></span></button>
      </div>
      <div class="product-main-btns-leasing">
        <button class="btn btn-lg btn-icon btn-block">Приобрести <br>в лизинг <span class="icon-leasing"></span></button>
      </div>
    </div>

  </section>
</template>

<script>

import { mapState } from 'vuex'
import { VueSlideToggle } from 'vue-slide-toggle'
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'

export default {
  name: 'ProductMain',
  components: {
    VueSlideToggle,
    Swiper,
    SwiperSlide
  },
  computed: {
    ...mapState({
      title: state => state.product.title,
      price: state => state.product.price,
      types: state => state.product.types,
      maxPower: state => state.product.maxPower,
      engineModel: state => state.product.engineModel,
      manufacturer: state => state.product.manufacturer,
      descr: state => state.product.descr,
      images: state => state.product.images,
      availability: state => state.product.availability,
      updateDate: state => state.product.updateDate,
      delivery: state => state.product.delivery,
      currentCity: state => state.globalVars.currentCity
    }),
    swiper () {
      return this.$refs.swiper
    }
  },
  watch: {
    types (newVal) {
      this.selectedType = newVal ? newVal[0].id : 0
    }
  },
  data: () => ({
    selectedType: 0,
    descrVisible: false,
    activeSlide: 1,
    swiperOptions: {
      direction: 'vertical',
      slidesPerView: 4,
      spaceBetween: 34,
      speed: 600,
      navigation: {
        nextEl: '.gallery-thumb-next',
        prevEl: '.gallery-thumb-prev'
      }
    }
  }),
  methods: {
    getAvailability (id) {
      let res = ''
      switch (id) {
        case 1:
          res = 'В наличии'
          break
        case 2:
          res = 'Нет в наличии'
          break
        default:
          break
      }
      return res
    },
    prevImg () {
      let ind = 0
      this.images.forEach((item, index) => {
        if (item.id === this.activeSlide) {
          ind = index
        }
      })
      // eslint-disable-next-line no-unused-expressions
      this.images[ind - 1] ? this.activeSlide = this.images[ind - 1].id : false
    },
    nextImg () {
      let ind = 0
      this.images.forEach((item, index) => {
        if (item.id === this.activeSlide) {
          ind = index
        }
      })
      // eslint-disable-next-line no-unused-expressions
      this.images[ind + 1] ? this.activeSlide = this.images[ind + 1].id : false
    }
  },
  mounted () {
    this.selectedType = this.types[0] ? this.types[0].id : 0
  }
}
</script>

<style scoped>

</style>
