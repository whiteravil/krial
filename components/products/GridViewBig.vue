<template>
  <div class="catalog-item big">
    <div class="catalog-item-top">
      <div class="catalog-item-tags">
        <span
          v-for="tag in item.tags"
          :key="tag.id"
          class="tag"
          v-text="tag"
        />
      </div>

      <div class="catalog-item-flag">
        <img
          :src="item.manufacturer.imgSrc"
          alt=""
        >
      </div>
    </div>

    <div class="catalog-item-body">

      <div class="catalog-item-big-body">

        <div class="catalog-item-big-body-left">
          <div class="catalog-item-title">
            <nuxt-link :to="item.url">{{ item.title }}</nuxt-link>
          </div>
        </div>

        <div class="catalog-item-big-body-right">
          <div class="catalog-item-img">
            <img
              width="378"
              height="258"
              :src="item.imgSrc"
              :class="{'grayscale': grayscale}"
              alt="">
          </div>
        </div>

      </div>

      <div class="catalog-item-price-block">
        <div class="catalog-item-price">
          {{ item.price | priceFilter }} ₽
        </div>

        <div class="catalog-item-availability">
          <div class="catalog-item-availability-left">
            {{ getAvailability(item.availability) }}
          </div>
          <div class="catalog-item-availability-right">
            <span
              class="liked-btn"
              :class="{'active': item.liked}"
            />
          </div>
        </div>
      </div>

      <div class="catalog-item-descr">
        <ul>
          <li>
            <span>Мощность макс. кВт.</span>
            <span>{{ item.maxPower }}</span>
          </li>
          <li>
            <span>Двигатель</span>
            <span>{{ item.engineModel }}</span>
          </li>
          <li>
            <span>Частота вращения ,об/мин</span>
            <span>{{ item.rotationFrequency }}</span>
          </li>
          <li>
            <span>Объём двигателя, л</span>
            <span>{{ item.engineVolume }}</span>
          </li>
        </ul>
      </div>
    </div>

    <div class="catalog-item-hover">
      <div class="catalog-item-title">
        <nuxt-link :to="item.url">{{ item.title }}</nuxt-link>
      </div>

      <div class="catalog-item-availability">
        <div class="catalog-item-availability-left">
          {{ getAvailability(item.availability) }} - обновлено {{ item.updateDate | parseDate }}
        </div>
        <div class="catalog-item-availability-right">
          <span
            class="liked-btn"
            :class="{'active': item.liked}"
          />
        </div>
      </div>

      <div class="catalog-item-descr">
        <ul>
          <li>
            <span>Мощность макс. кВт.</span>
            <span>{{ item.maxPower }}</span>
          </li>
          <li>
            <span>Двигатель</span>
            <span>{{ item.engineModel }}</span>
          </li>
          <li>
            <span>Частота вращения ,об/мин</span>
            <span>{{ item.rotationFrequency }}</span>
          </li>
          <li>
            <span>Объём двигателя, л</span>
            <span>{{ item.engineVolume }}</span>
          </li>
          <li>
            <span>Коэффициент мощности</span>
            <span>{{ item.powerFactor }}</span>
          </li>
          <li>
            <span>Напряжение, В</span>
            <span>{{ item.voltage }}</span>
          </li>
          <li>
            <span>Номинальная частота тока, Гц</span>
            <span>{{ item.currentFrequency }}</span>
          </li>
        </ul>

        <div class="catalog-item-btn">
          <a href="#" class="btn btn-with-icon">К сравнению <span class="icon-circle-plus"/></a>
          <nuxt-link
            :to="item.url"
            class="btn btn-secondary">Подробнее</nuxt-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'GridViewBig',
  props: {
    item: Object,
    grayscale: {
      type: Boolean,
      default: false
    }
  },
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
    }
  }
}
</script>

<style scoped>

</style>
