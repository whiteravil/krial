<template>

  <section
    class="s-main-section"
    :style="{backgroundImage: `url(${mainWindow ? mainWindow.background : ''})`}">

    <div class="main-section-content">
      <div class="container">

        <div class="main-section-logo">

          <a
            href="/"
            class="logo">

            <img
              :src="global.logoLightSrc"
              alt="">

          </a>

        </div>

        <div class="main-section-bottom">

          <div class="main-section-title">
            <div
              class="h2"
              v-html="mainWindow.title"/>
          </div>

          <nav class="main-section-menu">
            <a
              v-for="link in mainWindow.menu"
              :key="link.id"
              :href="link.url">
              {{ link.title }}
            </a>
          </nav>

        </div>

      </div>
    </div>

  </section>

</template>

<script>

import { mapState } from 'vuex'

export default {
  name: 'Index.vue',
  computed: {
    ...mapState({
      global: state => state.globalVars,
      mainWindow: state => state.homeMainWindow
    })
  },
  mounted () {
    this.$store.dispatch('homeMainWindow/getMainWindowInfo')
  }
}
</script>

<style scoped>

</style>
