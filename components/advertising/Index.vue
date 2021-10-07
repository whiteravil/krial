<template>

  <div class="adw-block">

    <a
      :href="item.url"
      class="adw-block-link"/>

    <div class="adw-block-bg">
      <img
        :src="item.imgSrc"
        alt="">
    </div>

    <div class="adw-block-content">

      <div class="adw-block-tags">
        <span
          v-for="tag in item.tags"
          :key="tag.id"
          class="tag">{{ tag }}</span>
      </div>

      <div class="adw-block-title">{{ item.title }}</div>

    </div>

  </div>

</template>

<script>
export default {
  name: 'Index',
  props: {
    item: Object
  }
}
</script>

<style scoped>

</style>
