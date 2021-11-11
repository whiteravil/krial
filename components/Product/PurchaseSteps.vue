<template>

  <section class="s-purchase-steps">
    <div class="section-title">
      <div
        class="h3"
        v-html="title"/>
    </div>

    <div class="purchase-steps">

      <div
        v-for="(step, rootIndex) in list"
        :key="step.id"
        class="purchase-step">

        <div class="purchase-step-icon">
          <img
            :src="step.imgSrc"
            alt="">
          <span>{{ rootIndex + 1 }}</span>
        </div>

        <div class="purchase-step-content">

          <v-popover
            trigger="hover"
            placement="right-start"
            boundariesElement="document.body"
            popoverClass="purchase-step-popover">

            <div
              class="purchase-step-content-title"
              v-html="step.descr"/>

            <template slot="popover">
              <div class="purchase-step-dropdown">

                <div class="purchase-step-dropdown-titles">
                  <p>Проблемы при выборе оборудования</p>
                  <p>Решение <br>КриалЭнергоСтрой</p>
                </div>

                <div class="purchase-step-dropdown-list">

                  <div
                    v-for="(problem, index) in step.problems"
                    :key="index"
                    class="purchase-step-dropdown-item">
                    <p v-html="problem.title"/>
                    <p v-html="problem.solution"/>
                  </div>

                </div>

              </div>
            </template>

          </v-popover>

        </div>

      </div>

    </div>
  </section>

</template>

<script>

import { mapState } from 'vuex'

export default {
  name: 'ProductPurchaseSteps',
  computed: {
    ...mapState({
      title: state => state.product.purchaseSteps.title,
      list: state => state.product.purchaseSteps.list
    })
  }
}
</script>

<style scoped>

</style>
