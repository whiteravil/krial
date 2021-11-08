<template>

  <section class="s-callback">
    <div class="container">

      <div class="callback-row">

        <div class="callback-left">

          <div class="section-title">
            <div
              class="h2"
              v-html="title"/>
          </div>

          <div class="callback-descr">
            <ul>
              <li
                v-for="(descrItem, index) in descr"
                :key="index"
                v-html="descrItem"/>
            </ul>
          </div>

        </div>

        <div class="callback-right">

          <CallbackForm
            :squareTextarea="true"
            :btnRounded="true" />

        </div>

      </div>

    </div>
  </section>

</template>

<script>

import { mapState } from 'vuex'

export default {
  name: 'Callback',
  computed: {
    ...mapState({
      title: state => state.callback.title,
      descr: state => state.callback.descr
    })
  }
}
</script>

<style scoped>

</style>
