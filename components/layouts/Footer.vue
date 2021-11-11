<template>

  <footer :class="['footer', {'footer--with-menu': withMenu}]">

    <div class="container">

      <div
        v-if="!withMenu"
        class="main-section-logo">

        <nuxt-link
          to="/"
          class="logo">

          <img
            :src="global.logoSrc"
            alt="">

        </nuxt-link>

      </div>

      <div class="footer-content-row">

        <div class="footer-content-left">

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

          <div class="footer-content">

            <div class="footer-about">

              <div class="footer-blockquote">
                <p>«{{ footerInfo.blockquote.text }}»</p>
                <span>{{ footerInfo.blockquote.author }}</span>
              </div>

              <div class="footer-about-text">
                <p>{{ footerInfo.info }}</p>
              </div>

              <div
                class="press-images"
                :class="{'hovered': activePress !== -1}">
                <img
                  v-for="item in footerInfo.pressCenter"
                  :key="item.id"
                  :src="item.imgSrc"
                  :class="{'active': item.id === activePress}"
                  alt="" />
              </div>

            </div>

            <div class="footer-press">

              <div class="press-link">
                <a href="#">Пресс-центр</a>
              </div>

              <nav class="press-center-links">
                <a
                  v-for="link in footerInfo.pressCenter"
                  :key="link.id"
                  :href="link.url"
                  @mouseover="activePress = link.id"
                  @mouseleave="activePress = -1">
                  {{ link.title }}
                </a>
              </nav>

            </div>

            <div
              v-if="!withMenu"
              class="footer-callback">

              <div class="h6">Хотите связаться с нами ?</div>

              <CallbackForm />

            </div>

          </div>

        </div>

        <div
          v-if="withMenu"
          class="footer-content-right">
          <nav class="footer-right-menu">
            <nuxt-link
              v-for="link in footerInfo.rightMenu"
              :key="link.id"
              :to="link.url"
              v-text="link.title" />
          </nav>
        </div>

      </div>

      <div class="footer-sticks">
        <div class="footer-stick">
          <img src="/images/sticks/ten-years.svg" alt="">
        </div>
        <div class="footer-stick">
          <img src="/images/sticks/ecology.svg" alt="">
        </div>
      </div>

      <div class="footer-bottom">

        <div class="footer-copy">
          {{ footerInfo.copyright }}
        </div>

        <nav class="footer-nav">
          <nuxt-link
            v-for="link in footerInfo.links"
            :key="link.id"
            :to="link.url">
            {{ link.title }}
          </nuxt-link>
        </nav>

      </div>

    </div>

  </footer>

</template>

<script>

import { mapState } from 'vuex'

export default {
  async fetch () {
    return await Promise.all([
      this.$store.dispatch('homeMainWindow/getMainWindowInfo'),
      this.$store.dispatch('footer/getFooterInfo')
    ])
  },
  name: 'Footer',
  props: {
    withMenu: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    ...mapState({
      global: state => state.globalVars,
      mainWindow: state => state.homeMainWindow,
      footerInfo: state => state.footer
    })
  },
  data: () => ({
    activePress: -1
  })
}
</script>

<style scoped>

</style>
