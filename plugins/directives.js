import Vue from 'vue'

Vue.directive('click-outside', {
  bind (el, binding, vnode) {
    el.clickOutsideEvent = function (event) {
      if (!(el === event.target || el.contains(event.target))) {
        vnode.context[binding.expression](event)
      }
    }
    document.body.addEventListener('click', el.clickOutsideEvent)
  },
  unbind (el) {
    document.body.removeEventListener('click', el.clickOutsideEvent)
  }
})

Vue.directive('loading', {
  inserted: (el, binding) => {
    binding.value ? el.classList.add('loading') : el.classList.remove('loading')
  },
  update: (el, binding) => {
    binding.value ? el.classList.add('loading') : el.classList.remove('loading')
  }
})
