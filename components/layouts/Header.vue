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

          <div class="header-search">
            <a
              href="#"
              class="header-search-btn"
              @click="openSearch">
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
              <a href="#">{{ getLang ? getLang.loc : '' }}</a>
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

    <HeaderMenu
      :menu="menu"
      @close-menu="closeMenu" />

    <Search
      v-if="searchOpened"
      @close="searchOpened = false" />

    <EquipmentSelection
      v-if="equipmentSelection" />

  </header>

</template>

<script>

import { mapState, mapGetters } from 'vuex'

export default {
  name: 'Header',
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
      getLang: 'globalVars/getLang'
    })
  },
  data: () => ({
    menu: false,
    searchOpened: false,
    equipmentSelection: true
  }),
  methods: {
    openMenu () {
      this.menu = true
    },
    closeMenu () {
      this.menu = false
    },
    openSearch () {
      this.searchOpened = true
    }
  },
  mounted () {
    this.$store.dispatch('header/getTopMenu')
    this.$store.dispatch('header/getSecondMenu')
  }
}
</script>

<style scoped>

</style>
