<template>

  <header class="header">

    <div class="header-top">
      <div class="container">

        <div class="header-row">

          <div
            v-if="visibleLogo"
            class="header-logo">

            <a href="/" class="logo">
              <img :src="global.logoSrc" alt="">
            </a>

          </div>

          <div class="header-left-menu">

            <a
              v-for="link in header.topMenu"
              :key="link.id"
              :href="link.url">{{ link.title }}</a>

          </div>

          <div class="header-center-menu">

            <ul>
              <li
                v-for="link in header.secondMenu"
                :key="link.id">
                <a :href="link.url">{{ link.title }}</a>
              </li>
            </ul>

            <div class="graph-info">
              <span class="icon-chart"></span>{{ global.graphVal }}
            </div>

          </div>

          <div class="header-menu-btn">
            <a
              href="#"
              class="menu-btn"
              @click="openMenu">
              <span class="icon-bar"></span>
            </a>
          </div>

          <div class="header-search-btn">
            <a href="#" class="search-btn">
              <span class="icon-search"></span>
            </a>
          </div>

          <div class="header-contacts">

            <div class="header-phone">
              <a :href="`tel:${global.phone}`">{{ global.phone }}</a>
            </div>

            <div class="header-email">
              <a :href="`mailto:${global.email}`">{{ global.email }}</a>
            </div>

          </div>

          <div class="header-location">
            <div class="header-position">{{ global.currentCity }}</div>
            <div class="header-lang">
              <a href="#">{{ getLang.loc }}</a>
            </div>
          </div>

          <div class="header-account">

            <div class="header-account-auth">
              <a href="#" class="btn btn-xs">Войти</a>
            </div>

            <div class="header-account-btns">
              <a href="#" class="acc-btn">
                <span class="icon-heart"></span>
              </a>
              <a href="#" class="acc-btn">
                <span class="icon-graph"></span>
              </a>
              <a href="#" class="acc-btn">
                <span class="icon-cart"></span>
              </a>
            </div>

          </div>

        </div>

      </div>
    </div>

    <div :class="['main-menu', menu ? 'opened' : '']">

      <div class="main-menu-header">

        <div class="main-menu-logo">

          <a href="/" class="logo">
            <img :src="global.logoSrc" alt="">
          </a>

        </div>

        <div
          class="main-menu-close-btn"
          @click="closeMenu">
          <span class="icon-close"></span>
        </div>

      </div>

      <div class="main-menu-body">

        <div
          v-for="menu in header.mainMenu"
          :key="menu.id"
          class="main-menu-col">

          <div class="main-menu-col-title">
            <a :href="menu.url">{{ menu.title }}</a>
          </div>

          <nav class="main-menu-nav">
            <a
              v-for="link in menu.menuList"
              :key="link.id"
              :href="link.url"
              class="main-menu-nav-link">
              {{ link.title }}
            </a>
          </nav>

        </div>

        <div class="main-menu-right">

          <nav class="main-menu-right-nav">
            <ul>

              <li
                v-for="link in getRightMenu"
                :key="link.id"
                :class="{'has-child': link.childrens}">

                <a
                  v-if="link.childrens"
                  :href="link.url"
                  @click="toggleMenuHandler(link)"
                  :class="{'opened': link.opened}">
                  {{ link.title }}
                  <span class="plus"></span>
                </a>

                <a
                  v-else
                  :href="link.url">
                  {{ link.title }}
                </a>

                <VueSlideToggle
                  v-if="link.childrens"
                  :open="link.opened"
                  :duration="500">
                  <ul class="submenu">
                    <li
                      v-for="submenuLink in link.childrens"
                      :key="submenuLink.id">
                      <a :href="submenuLink.url">{{ submenuLink.title }}</a>
                    </li>
                  </ul>
                </VueSlideToggle>

              </li>

            </ul>
          </nav>

        </div>

      </div>

      <div class="main-menu-footer">

        <div class="main-menu-footer-contacts">
          <a
            class="phone-link"
            :href="`tel:${global.phone}`">{{ global.phone }}</a>
          <a
            class="email-link"
            :href="`mailto:${global.email}`">{{ global.email }}</a>
        </div>

        <div class="main-menu-footer-office">
          <div class="h6">офис</div>
          <p>{{ global.location }}</p>
        </div>

      </div>

    </div>

    <Search />

    <div
      :class="['overlay-bg', menu ? 'visible' : '']"
      @click="closeMenu"/>

  </header>

</template>

<script>

import { VueSlideToggle } from 'vue-slide-toggle'
import { mapState, mapGetters } from 'vuex'

export default {
  name: 'Header',
  components: {
    VueSlideToggle
  },
  props: {
    visibleLogo: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    ...mapState({
      header: state => state.header,
      global: state => state.globalVars
    }),
    ...mapGetters({
      getLang: 'globalVars/getLang',
      getRightMenu: 'header/getRightMenu'
    })
  },
  data: () => ({
    menu: false
  }),
  methods: {
    toggleMenuHandler (menu) {
      this.$store.commit('header/openMenu', {
        id: menu.id,
        opened: !menu.opened
      })
    },
    openMenu () {
      this.menu = true
    },
    closeMenu () {
      this.menu = false
    }
  }
}
</script>

<style scoped>

</style>
