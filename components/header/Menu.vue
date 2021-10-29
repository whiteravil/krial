<template>

  <div class="menu-component">

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
                v-for="link in header.mainMenuRight"
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
