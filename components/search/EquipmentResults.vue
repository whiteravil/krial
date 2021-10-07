<template>

  <div class="search-results-full-body">

    <div class="search-results-equipments-header">
      <div class="search-results-equipments-header-th">
        <span>200 кВт (250 кВА)</span>
      </div>
      <div class="search-results-equipments-header-th">Мощность макс.</div>
      <div class="search-results-equipments-header-th">Производитель</div>
      <div class="search-results-equipments-header-th">Расход топлива (75%)</div>
      <div class="search-results-equipments-header-th">Цена</div>
    </div>

    <div
      class="search-results-equipments-list"
      :class="{'loaded': loaded}">

      <div
        v-for="searchItem in list"
        :key="searchItem.id"
        class="search-results-equipment">

        <div class="equipment-main">

          <div class="equipment-img">
            <a :href="searchItem.url">
              <img :src="searchItem.imgSrc" alt="">
            </a>
          </div>

          <div class="equipment-title">
            <div class="h4">
              <a :href="searchItem.url">
                {{ searchItem.title }}
              </a>
            </div>
            <div class="equipment-tags">
              <div
                v-for="tag in searchItem.tags"
                :key="tag"
                class="tag">
                {{ tag }}
              </div>
            </div>
          </div>

        </div>

        <div class="equipment-power">
          {{ searchItem.maxPower }} кВт
        </div>

        <div class="equipment-manufacturer">
          <span>{{ searchItem.manufacturer.name }}</span>
          <img :src="searchItem.manufacturer.imgSrc" alt="">
        </div>

        <div class="equipment-fuel-consumption">
          {{ searchItem.fuelConsumption }} л/ч
        </div>

        <div class="equipment-parameters">

          <v-popover
            trigger="hover"
            placement="bottom-start"
            boundariesElement="document.body">

            <span class="tooltip-exc icon-exc"></span>

            <template slot="popover">
              <div class="info-hover-dropdown">
                <ul>
                  <li>
                    <span>Мощность макс. кВт.</span>
                    <span>{{ searchItem.maxPower }}</span>
                  </li>
                  <li>
                    <span>Двигатель</span>
                    <span>{{ searchItem.manufacturer.name }}</span>
                  </li>
                  <li>
                    <span>Частота вращения ,об/мин</span>
                    <span>{{ searchItem.rotationFrequency }}</span>
                  </li>
                  <li>
                    <span>Объём двигателя, л</span>
                    <span>{{ searchItem.engineVolume }}</span>
                  </li>
                  <li>
                    <span>Коэффициент мощности</span>
                    <span>{{ searchItem.powerFactor }}</span>
                  </li>
                  <li>
                    <span>Напряжение, В</span>
                    <span>{{ searchItem.voltage }}</span>
                  </li>
                  <li>
                    <span>Номинальная частота тока, Гц</span>
                    <span>{{ searchItem.currentFrequency }}</span>
                  </li>
                </ul>
              </div>
            </template>

          </v-popover>

        </div>

        <div class="equipment-price">
          <div class="price-sum">{{ $options.filters.priceFilter(searchItem.price) }} ₽</div>
          <p>{{ getAvailability(searchItem.availability) }} — обновлено {{ searchItem.updateDate | parseDate }}</p>
        </div>

        <div class="equipment-more">
          <a :href="searchItem.url" class="btn btn-secondary">Подробнее</a>
        </div>

        <div class="equipment-liked">
          <span
            class="liked-btn"
            :class="{'active': searchItem.liked}" />
        </div>

      </div>

    </div>

  </div>

</template>

<script>

export default {
  name: 'EquipmentResults',
  props: {
    loaded: Boolean,
    list: Array
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
