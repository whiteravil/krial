<template>

  <div
    class="sort-select"
    :class="{'opened': opened}">
    <div class="sort-selected">
      <span @click="titleClick">{{getSelectedText()}}</span>
    </div>
    <div
      class="sort-dropdown">
      <ul>
        <li
          v-for="listItem in list"
          :key="listItem.id">
          <a
            href="#"
            :class="{'active': selected === listItem.id}"
            @click.prevent="selectItem(listItem.id)">
            {{ listItem.title }}
          </a>
        </li>
      </ul>
    </div>
  </div>

</template>

<script>
export default {
  name: 'SortSelect',
  asyncData (store) {

  },
  props: {
    list: Array,
    selected: Number
  },
  data: () => ({
    opened: false
  }),
  methods: {
    titleClick () {
      this.opened ? this.closeDropdown() : this.openDropdown()
    },
    openDropdown () {
      this.opened = true
    },
    closeDropdown () {
      this.opened = false
    },
    getSelectedText () {
      return this.list.filter(item => item.id === this.selected)[0] ? this.list.filter(item => item.id === this.selected)[0].title : ''
    },
    selectItem (id) {
      if (id !== this.selected) {
        this.$emit('selectItem', id)
        this.closeDropdown()
        this.$emit('change')
      }
    }
  },
  mounted () {
    const clickEvent = e => {
      if (!e.target.closest('.sort-select')) {
        this.closeDropdown()
      }
    }
    document.addEventListener('click', clickEvent)
    this.$once('hook:beforeDestroy', () => document.removeEventListener('click', clickEvent))
  }
}
</script>

<style scoped>

</style>
