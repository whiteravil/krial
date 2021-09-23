import Vue from 'vue'
import VTooltip from 'v-tooltip'

Vue.use(VTooltip, {
  defaultBoundariesElement: document.body,
  popperOptions: {
    preventOverflow: false,
    boundariesElement: document.body
  }
})
