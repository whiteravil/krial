<template>

  <footer class="footer">

    <div class="container">

      <div class="main-section-logo">

        <a
          href="/"
          class="logo">

          <img
            :src="global.logoSrc"
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

        <div class="footer-callback">

          <div class="h6">Хотите связаться с нами ?</div>

          <form class="callback-form">

            <div class="form-group">
              <v-select
                v-model="topic"
                :options="topicOptions"
                :searchable="false"
                placeholder="Тема обращения"/>
            </div>

            <div class="form-row">

              <div class="form-group">
                <input
                  type="text"
                  class="form-control"
                  v-model="name"
                  placeholder="Ваше имя или компания"/>
              </div>

              <div class="form-group">
                <input
                  type="text"
                  class="form-control"
                  v-model="phone"
                  v-mask="'+7 ### ### ## ##'"
                  placeholder="+7"/>
              </div>

            </div>

            <div class="form-group">
              <textarea-autosize
                class="form-control"
                placeholder="Сообщение"
                :min-height="49"
                :max-height="200" />
            </div>

            <div class="form-footer">

              <div class="form-checkbox">
                <label>
                  <input
                    type="checkbox"
                    v-model="confirm">
                  <span>Я даю согласие на обработку моих персональных данных</span>
                </label>
              </div>

              <div class="form-submit">
                <button
                  class="btn btn-no-round btn-block btn-gray btn-sm-2"
                  type="submit"
                  :disabled="!confirm">отправить</button>
              </div>

            </div>

          </form>

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
          <a
            v-for="link in footerInfo.links"
            :key="link.id"
            :href="link.url">
            {{ link.title }}
          </a>
        </nav>

      </div>

    </div>

  </footer>

</template>

<script>

import { mapState } from 'vuex'

export default {
  async fetch () {
    await Promise.all([
      this.$store.dispatch('homeMainWindow/getMainWindowInfo'),
      this.$store.dispatch('footer/getFooterInfo')
    ])
  },
  name: 'Footer',
  computed: {
    ...mapState({
      global: state => state.globalVars,
      mainWindow: state => state.homeMainWindow,
      footerInfo: state => state.footer
    })
  },
  data: () => ({
    activePress: -1,
    topic: '',
    name: '',
    phone: '',
    message: '',
    confirm: true,
    topicOptions: [
      'Тема 1',
      'Тема 2',
      'Тема 3',
      'Тема 4'
    ]
  })
}
</script>

<style scoped>

</style>
