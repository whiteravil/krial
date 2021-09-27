import Vue from 'vue'
import VueMask from 'v-mask'
import { VueMaskFilter } from 'v-mask'

Vue.use(VueMask)
Vue.filter('VMask', VueMaskFilter)
