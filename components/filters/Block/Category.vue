<template>

  <div class="filter-item accent">

    <v-popover
      trigger="click"
      :placement="position"
      class="filter-item-popup"
      popoverClass="filter-item-dropdown"
      boundariesElement="document.body">

      <div class="filter-item-selected">

        <div class="filter-item-selected-label">
          <span>{{ getTitle() }}</span>
        </div>

      </div>

      <template slot="popover">

        <div class="filter-dropdown-row">

          <div class="filter-dropdown-form">

            <div class="filter-dropdown-checkboxes">

              <div
                v-for="category in categories"
                :key="category.id"
                class="filter-dropdown-checkbox">
                <div class="form-checkbox">
                  <label>
                    <input
                      type="radio"
                      name="category-radio"
                      :value="category.id"
                      v-model="selected">
                    <span>{{ category.title }}</span>
                  </label>
                </div>
              </div>

            </div>

          </div>

        </div>

      </template>

    </v-popover>

  </div>

</template>

<script>

import { mapState } from 'vuex'

export default {
  name: 'Category',
  props: {
    position: {
      type: String,
      default: 'bottom-start'
    }
  },
  computed: {
    ...mapState({
      categories: state => state.catalogCategory.catalogCategories
    })
  },
  data: () => ({
    selected: 0
  }),
  methods: {
    getTitle () {
      let res = this.categories.filter(item => item.id === this.selected)[0]
      return res ? res.title : ''
    }
  },
  mounted () {
    if (this.categories.length === 0) {
      this.$store.dispatch('catalogCategory/getCatalogCategories').then(() => {
        this.selected = this.categories[0].id
      })
    }
    this.selected = this.categories[0].id
  }
}
</script>

<style scoped>

</style>
