<template>
  <div class="security-code-wrap">
    <label for="code">
      <ul class="security-code-container">
        <li class="field-wrap" v-for="(item, index) in number" :key="index">
          <i class="char-field">{{value[index] || placeholder}}</i>
        </li>
      </ul>
    </label>
    <input ref="input" class="input-code" @keyup="handleInput($event)" v-model="value"
           id="code" name="code" type="tel" :maxlength="number"
           autocorrect="off" autocomplete="off" autocapitalize="off">
  </div>
</template>

<script>
export default {
  name: 'SecurityCode',
  props: {
    number: {
      type: Number,
      default: 4
    },
    placeholder: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      value: ''
    }
  },
  methods: {
    hideKeyboard () {
      document.activeElement.blur() // ios隐藏键盘
      this.$refs.input.blur() // android隐藏键盘
    },
    handleSubmit () {
      this.$emit('input', this.value)
    },
    handleInput (e) {
      this.$refs.input.value = this.value
      if (this.value.length >= this.number) {
        this.hideKeyboard()
      }
      this.handleSubmit()
    }
  }
}
</script>

<style scoped lang="stylus">
.security-code-wrap
  overflow hidden

.security-code-container
  margin 0
  padding 0
  display flex
  margin-top 40px
  justify-content center
  margin-right -40px

  .field-wrap
    list-style none
    display block
    width 62px
    height 52px
    line-height 52px
    font-size 24px
    background-color: #fff
    margin-right 40px
    border-radius 4p
    color #000
    text-align center

    .char-field
      font-style normal

.input-code
  position absolute
  left -9999px
  top -99999px
  width 0
  height 0
  opacity 0
  overflow visible
  z-index -1
</style>
