<template>

  <div class="menu-component">

    <div :class="['main-menu', menu ? 'opened' : '']">

      <div class="main-menu-header">

        <div class="main-menu-logo">

          <nuxt-link to="/" class="logo">
            <img :src="global.logoSrc" alt="">
          </nuxt-link>

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
            <nuxt-link :to="menu.url">{{ menu.title }}</nuxt-link>
          </div>

          <nav class="main-menu-nav">
            <nuxt-link
              v-for="link in menu.menuList"
              :key="link.id"
              :to="link.url"
              class="main-menu-nav-link">
              {{ link.title }}
            </nuxt-link>
          </nav>

        </div>

        <div class="main-menu-right">

          <nav class="main-menu-right-nav">
            <ul>

              <li
                v-for="link in header.mainMenuRight"
                :key="link.id"
                :class="{'has-child': link.childrens}">

                <nuxt-link
                  v-if="link.childrens"
                  :to="link.url"
                  @click="toggleMenuHandler(link)"
                  :class="{'opened': link.opened}">
                  {{ link.title }}
                  <span class="plus"></span>
                </nuxt-link>

                <nuxt-link
                  v-else
                  :to="link.url">
                  {{ link.title }}
                </nuxt-link>

                <VueSlideToggle
                  v-if="link.childrens"
                  :open="link.opened"
                  :duration="500">
                  <ul class="submenu">
                    <li
                      v-for="submenuLink in link.childrens"
                      :key="submenuLink.id">
                      <nuxt-link :to="submenuLink.url">{{ submenuLink.title }}</nuxt-link>
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

    <div
      :class="['overlay-bg', menu ? 'visible' : '']"
      @click="closeMenu"/>

  </div>

</template>

<script>

import { VueSlideToggle } from 'vue-slide-toggle'
import { mapState } from 'vuex'

export default {
  async fetch () {
    await Promise.all([
      this.$store.dispatch('header/getMainMenu'),
      this.$store.dispatch('header/getMainMenuRight')
    ])
  },
  name: 'Menu',
  components: {
    VueSlideToggle
  },
  props: {
    menu: Boolean
  },
  computed: {
    ...mapState({
      header: state => state.header,
      global: state => state.globalVars
    })
  },
  methods: {
    toggleMenuHandler (menu) {
      this.$store.commit('header/openMenu', {
        id: menu.id,
        opened: !menu.opened
      })
    },
    closeMenu () {
      this.$emit('close-menu')
    }
  }
}
</script>

<style scoped>

</style>
