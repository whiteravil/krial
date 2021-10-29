<template>

  <header
    class="header"
    :class="classes">

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

            <nuxt-link
              v-for="link in header.topMenu"
              :key="link.id"
              :to="link.url">{{ link.title }}</nuxt-link>

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

              <div class="header-account-btn">
                <a href="#" class="acc-btn">
                  <span class="icon-heart"></span>
                </a>
              </div>

              <div class="header-account-btn">

                <a
                  href="#"
                  class="acc-btn"
                  @click="openDropdown('basket')">
                  <span class="icon-graph"></span>
                  <span
                    v-if="account.basket.length > 0"
                    class="acc-btn-qnt"
                    v-text="account.basket.length"/>
                </a>

                <div
                  v-if="account.basket.length > 0"
                  class="header-acc-dropdown"
                  :class="{'opened': basketDropdown}">

                  <div
                    class="header-acc-dropdown-list"
                    v-loading="deleteLoading">
                    <AccountProduct
                      v-for="item in account.basket"
                      :key="item.key"
                      :item="item"
                      @remove="removeBasketItem(item.id)"/>
                  </div>

                  <div class="header-acc-dropdown-btn">
                    <a href="#" class="btn btn-block btn-border">Перейти к сравнению</a>
                  </div>

                </div>

              </div>

              <div class="header-account-btn">

                <a
                  href="#"
                  class="acc-btn"
                  @click="openDropdown('compare')">
                  <span class="icon-cart"></span>
                  <span
                    v-if="account.compare.length > 0"
                    class="acc-btn-qnt"
                    v-text="account.compare.length"/>
                </a>

                <div
                  v-if="account.compare.length > 0"
                  class="header-acc-dropdown"
                  :class="{'opened': compareDropdown}">

                  <div
                    class="header-acc-dropdown-list"
                    v-loading="deleteLoading">
                    <AccountProduct
                      v-for="item in account.compare"
                      :key="item.key"
                      :item="item"
                      @remove="removeCompareItem(item.id)"/>
                  </div>

                  <div class="header-acc-dropdown-btn">
                    <a href="#" class="btn btn-block btn-border">Перейти в корзину</a>
                  </div>

                </div>

              </div>

            </div>

          </div>

        </div>

      </div>
    </div>

    <HeaderMenu
      :menu="menu"
      @close-menu="closeMenu"/>

    <Search
      ref="searchComponent"
      v-if="searchOpened"
      @close="searchOpened = false"
      @open-selection="openSelection"/>

    <EquipmentSelection
      ref="equipmentSelectionComponent"
      v-if="equipmentSelection"
      @close="equipmentSelection = false"
      :selectedEquipment="selectedEquipment"
      @open-search="openSearch"/>

  </header>

</template>

<script>

import { mapState, mapGetters } from 'vuex'

export default {
  async fetch () {
    await Promise.all([
      this.$store.dispatch('header/getTopMenu'),
      this.$store.dispatch('header/getSecondMenu'),
      this.$store.dispatch('account/getBasketList'),
      this.$store.dispatch('account/getCompareList')
    ])
  },
  name: 'Header',
  props: {
    visibleLogo: {
      type: Boolean,
      default: true
    },
    classes: [String, Array, Object]
  },
  computed: {
    ...mapState({
      header: state => state.header,
      global: state => state.globalVars,
      account: state => state.account
    }),
    ...mapGetters({
      getLang: 'globalVars/getLang'
    })
  },
  data: () => ({
    menu: false,
    searchOpened: false,
    equipmentSelection: false,
    selectedEquipment: null,
    deleteLoading: false,
    basketDropdown: false,
    compareDropdown: false
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
    },
    closeSearch () {
      this.$refs.searchComponent.closeSearch()
    },
    openSelection (id) {
      this.closeSearch()
      this.selectedEquipment = id
      this.equipmentSelection = true
    },
    closeSelection () {
      this.$refs.equipmentSelectionComponent.closeSelection()
    },
    removeBasketItem (id) {
      this.deleteLoading = true
      this.$store.dispatch('account/deleteBasketItem', id).then(() => {
        this.deleteLoading = false
      })
    },
    removeCompareItem (id) {
      this.deleteLoading = true
      this.$store.dispatch('account/deleteCompareItem', id).then(() => {
        this.deleteLoading = false
      })
    },
    openDropdown (type) {
      if (type === 'basket') {
        this.basketDropdown = !this.basketDropdown
        this.compareDropdown = false
      }
      if (type === 'compare') {
        this.compareDropdown = !this.compareDropdown
        this.basketDropdown = false
      }
    }
  },
  mounted () {
    const clickOutDropdown = e => {
      let tg = e.target
      if (!tg.closest('.header-account-btn') && !tg.closest('.header-acc-dropdown')) {
        this.basketDropdown = false
        this.compareDropdown = false
      }
    }
    document.addEventListener('click', clickOutDropdown)
    this.$once('hook:beforeDestroy', () => document.removeEventListener('click', clickOutDropdown))
  }
}
</script>

<style scoped>

</style>
