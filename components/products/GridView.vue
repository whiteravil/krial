<template>

  <div
    class="catalog-item"
    :class="{'with-border': withBorder}">

    <div class="catalog-item-top">

      <div
        v-if="item.sticks"
        class="catalog-item-sticks">
        <div
          v-for="(stick, i) in item.sticks"
          :key="i"
          class="stick"
          ref="stick"
          :class="`type-${stick.type}`">
          <div class="stick-content">{{ stick.title }}</div>
        </div>
      </div>

      <div
        v-if="item.tags"
        class="catalog-item-tags">
        <span
          class="tag"
          v-for="tag in item.tags"
          :key="tag.id"
          v-text="tag"/>
      </div>

      <div class="catalog-item-flag">
        <img
          :src="item.manufacturer.imgSrc"
          alt="">
      </div>

    </div>

    <div class="catalog-item-body">

      <div class="catalog-item-img">
        <img
          width="378"
          height="258"
          :src="item.imgSrc"
          :class="{'grayscale': grayscale}"
          alt="">
      </div>

      <div class="catalog-item-title">
        <nuxt-link :to="item.url">{{ item.title }}</nuxt-link>
      </div>

      <div class="catalog-item-price-block">

        <div class="catalog-item-price">{{ item.price | priceFilter }} ₽</div>

        <div class="catalog-item-availability">
          <div class="catalog-item-availability-left">
            {{ getAvailability(item.availability) }}
          </div>
          <div class="catalog-item-availability-right">
          <span
            class="liked-btn"
            :class="{'active': item.liked}"/>
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
            :class="{'active': item.liked}"/>
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
          <a href="#" class="btn btn-with-icon">К сравнению <span class="icon-circle-plus"></span></a>
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
  name: 'GridView',
  props: {
    item: Object,
    grayscale: {
      type: Boolean,
      default: false
    },
    withBorder: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    stick () {
      return this.$refs.stick
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
    },
    setStickWidth () {
      if (this.stick) {
        this.stick.forEach(stick => {
          stick.style.width = ''
          const contentW = stick.querySelector('.stick-content').offsetWidth
          stick.style.width = `${contentW}px`
        })
      }
    }
  },
  mounted () {
    this.setStickWidth()
  }
}
</script>
