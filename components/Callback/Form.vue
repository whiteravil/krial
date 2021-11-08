<template>
  <form class="callback-form">

    <div class="form-group">
      <v-select
        v-model="topic"
        :options="topicOptions"
        :searchable="false"
        placeholder="Тема обращения"/>
    </div>

    <div class="form-row">

      <div class="form-group">
        <input
          type="text"
          class="form-control"
          v-model="name"
          placeholder="Ваше имя или компания"/>
      </div>

      <div class="form-group">
        <input
          type="text"
          class="form-control"
          v-model="phone"
          v-mask="'+7 ### ### ## ##'"
          placeholder="+7"/>
      </div>

    </div>

    <div class="form-group">

      <template v-if="squareTextarea">
        <label class="form-label">Сообщение</label>
        <textarea class="form-control square"></textarea>
      </template>

      <template v-else>
        <textarea-autosize
          class="form-control"
          placeholder="Сообщение"
          :min-height="49"
          :max-height="200"/>
      </template>

    </div>

    <div class="form-footer">

      <div class="form-checkbox">
        <label>
          <input
            type="checkbox"
            v-model="confirm">
          <span>Я даю согласие на обработку моих персональных данных</span>
        </label>
      </div>

      <div class="form-submit">
        <button
          :class="['btn', {'btn-no-round btn-block btn-gray btn-sm-2 btn-block': !btnRounded}, {'btn-white': btnRounded}]"
          type="submit"
          :disabled="!confirm">{{ btnRounded ?'Заказать звонок' : 'отправить' }}
        </button>
      </div>

    </div>

  </form>
</template>

<script>
export default {
  name: 'CallbackForm',
  props: {
    squareTextarea: {
      type: Boolean,
      default: false
    },
    btnRounded: {
      type: Boolean,
      default: false
    }
  },
  data: () => ({
    topic: '',
    name: '',
    phone: '',
    message: '',
    confirm: true,
    topicOptions: [
      'Тема 1',
      'Тема 2',
      'Тема 3',
      'Тема 4'
    ]
  })
}
</script>

<style scoped>

</style>
