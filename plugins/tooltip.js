import Vue from 'vue'
import { VTooltip, VPopover } from 'v-tooltip'

Vue.use(VTooltip, {
  preventOverflow: false,
  defaultBoundariesElement: document.body,
  defaultPopperOptions: {
    boundariesElement: document.body
  }
})

Vue.component('v-popover', VPopover)
