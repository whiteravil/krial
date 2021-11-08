<template>

  <div class="article-item">

    <div class="article-item-img">
      <img
        :src="item.imgSrc"
        alt="">
    </div>

    <div class="article-item-content">

      <div
        v-if="item.tag"
        class="tag">{{ item.tag }}</div>

      <div
        ref="content"
        class="article-item-content-text">
        <div class="h3">{{ item.title }}</div>
        <p v-html="item.descr" />
        <nuxt-link
          :to="item.url"
          class="btn btn-white">Подробнее</nuxt-link>
      </div>

    </div>

  </div>

</template>

<script>
export default {
  name: 'Article',
  props: {
    item: Object
  },
  computed: {
    content () {
      return this.$refs.content
    }
  },
  methods: {
    transformContent () {
      const contentH = this.content.offsetHeight
      const titleH = this.content.querySelector('.h3').offsetHeight
      this.content.style.transform = `translateY(${contentH - titleH}px)`
    }
  },
  mounted () {
    this.transformContent()
    window.addEventListener('resize', this.transformContent)
    this.$on('hook:beforeDestroy', () => window.removeEventListener('resize', this.transformContent))
  }
}
</script>
