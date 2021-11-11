<template>
  <section class="s-product-characteristics">

    <div class="product-characteristics">

      <div class="product-characteristics-left">

        <div class="section-title with-line">
          <div class="h3">Основные характеристики</div>
        </div>

        <div class="main-characteristics">

          <div
            v-if="characteristics.class"
            class="main-characteristics-item">
            Класс станции
            <span>{{ characteristics.class }}</span>
          </div>

          <div
            v-if="characteristics.guarantee"
            class="main-characteristics-item">
            Гарантия
            <span>{{ characteristics.guarantee }}</span>
          </div>

        </div>

        <div class="characteristics-list">
          <ul>
            <li v-if="characteristics.power">
              <span>Номинальная мощность, кВт</span>
              <span>{{ characteristics.power }}</span>
            </li>
            <li v-if="characteristics.maxPower">
              <span>Мощность максимальная, кВт</span>
              <span>{{ characteristics.maxPower }}</span>
            </li>
            <li v-if="characteristics.powerAmper">
              <span>Мощность номинальная, кВт (кВА)</span>
              <span>{{ characteristics.powerAmper }}</span>
            </li>
            <li v-if="characteristics.maxPowerAmper">
              <span>Мощность максимальная, кВА</span>
              <span>{{ characteristics.maxPowerAmper }}</span>
            </li>
            <li v-if="characteristics.powerFactor">
              <span>Коэффициент мощности</span>
              <span>{{ characteristics.powerFactor }}</span>
            </li>
            <li v-if="characteristics.voltage">
              <span>Напряжение, В</span>
              <span>{{ characteristics.voltage }}</span>
            </li>
            <li v-if="characteristics.currentFrequency">
              <span>Номинальная частота тока, Гц</span>
              <span>{{ characteristics.currentFrequency }}</span>
            </li>
          </ul>
        </div>

      </div>

      <div class="product-characteristics-right">

        <div class="section-title with-line">
          <div class="h3">двигатель</div>
        </div>

        <div class="main-characteristics">

          <div
            v-if="characteristics.engineName"
            class="main-characteristics-item">
            Двигатель
            <span>{{ characteristics.engineName }}</span>
          </div>

          <div
            v-if="characteristics.maxPower"
            class="main-characteristics-item">
            Мощность макс.
            <span>{{ characteristics.maxPower }}</span>
          </div>

          <div
            v-if="characteristics.fuelConsumption"
            class="main-characteristics-item">
            Расход
            <span>{{ characteristics.fuelConsumption }} л/ч</span>
          </div>

        </div>

        <div class="characteristics-list">
          <ul>
            <li v-if="characteristics.engineModel">
              <span>Марка и модель двигателя</span>
              <span>{{ characteristics.engineModel }}</span>
            </li>
            <li v-if="characteristics.rotationFrequency">
              <span>Частота вращения, об/мин</span>
              <span>{{ characteristics.rotationFrequency }}</span>
            </li>
            <li v-if="characteristics.cylindersNumber">
              <span>Количество цилиндров</span>
              <span>{{ characteristics.cylindersNumber }}</span>
            </li>
            <li v-if="characteristics.engineVolume">
              <span>Объём двигателя, л</span>
              <span>{{ characteristics.engineVolume }}</span>
            </li>
            <li v-if="characteristics.launchType">
              <span>Тип запуска</span>
              <span>{{ characteristics.launchType }}</span>
            </li>
            <li v-if="characteristics.engineType">
              <span>Тип двигателя</span>
              <span>{{ characteristics.engineType }}</span>
            </li>
          </ul>
        </div>

      </div>

    </div>

    <div class="product-characteristics-more">
      <a href="#" class="link link-muted">Все характеристики</a>
    </div>

  </section>
</template>

<script>

import { mapState } from 'vuex'

export default {
  name: 'ProductCharacteristics',
  computed: {
    ...mapState({
      characteristics: state => state.product.characteristics
    })
  }
}
</script>
