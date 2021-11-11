<template>

  <section
    class="s-main-section"
    :style="{backgroundImage: `url(${mainWindow ? mainWindow.background : ''})`}">

    <div class="main-section-content">
      <div class="container">

        <div class="main-section-logo">

          <nuxt-link
            to="/"
            class="logo">

            <img
              :src="global.logoLightSrc"
              alt="">

          </nuxt-link>

        </div>

        <div class="main-section-bottom">

          <div class="main-section-title">
            <div
              class="h2"
              v-html="mainWindow.title"/>
          </div>

          <nav class="main-section-menu">
            <nuxt-link
              v-for="link in mainWindow.menu"
              :key="link.id"
              :to="link.url">
              {{ link.title }}
            </nuxt-link>
          </nav>

        </div>

      </div>
    </div>

  </section>

</template>

<script>

import { mapState } from 'vuex'

export default {
  async fetch () {
    await this.$store.dispatch('homeMainWindow/getMainWindowInfo')
  },
  name: 'Index.vue',
  computed: {
    ...mapState({
      global: state => state.globalVars,
      mainWindow: state => state.homeMainWindow
    })
  }
}
</script>

<style scoped>

</style>
