<template>

  <div class="pagination">

    <nav class="pagination-nav">
      <button
        v-for="index in pages"
        :key="index"
        class="pagination-nav-link"
        :class="{'active': index === page}"
        @click="$emit('page-to', index)">
        {{ index }}
      </button>
      <button
        class="pagination-nav-next"
        @click="$emit('page-to', page + 1)"
        :disabled="page === pages">Вперед</button>
    </nav>

    <div class="pagination-load-more">
      <button
        class="btn"
        @click="$emit('load-more')"
        :disabled="visibleLength === length">Показать еще</button>
    </div>

    <div class="pagination-visible">
      Показано {{ page === pages ? length : page * paginatedLength }} из {{length}}
    </div>

  </div>

</template>

<script>
export default {
  name: 'Pagination',
  props: {
    pages: {
      type: Number,
      default: 1
    },
    page: Number,
    length: {
      type: Number,
      default: 0
    },
    paginatedLength: {
      type: Number,
      default: 0
    },
    visibleLength: {
      type: Number,
      default: 0
    }
  }
}
</script>

<style scoped>

</style>
