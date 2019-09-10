<template>
  <div
    :class="classObj"
    @mouseenter="onButtonFocused"
    @mouseleave="onButtonFocused"
    @click="$emit('button-selected')"
  >{{ buttonText(buttonData.text) }}
  </div>
</template>

<script>
  import util from '../util/util';

  export default {
    name: "Button",
    props: ['buttonData'],
    computed: {
      classObj: function () {
        return {
          'button': true,
          'button-basic--success': this.buttonData.type && this.buttonData.type.success || false,
          'button-basic--focused': this.focused
        }
      }
    },
    data() {
      return {
        focused: false
      }
    },
    methods: {
      buttonText: function (text) {
        return util.getLocale(text);
      },
      onButtonFocused: function () {
        this.focused = !this.focused;
      },
      onButtonClicked: function () {
        /*Basic Button Component Clicked*/
        if (this.buttonData.action) {
          this.buttonData.action();
        }
      }
    }
  }
</script>

<style scoped>
  .button {
    display: flex;
    align-items: center;
    font-weight: 600;
    font-size: 1.4rem;
    border-radius: .2rem;
    line-height: 1.5;
    text-align: center;
    padding: .8rem 2rem;
    cursor: pointer;
    transition: background-color 600ms;
  }

  .button-basic--success {
    background-color: #8ec03f;
    color: #f6f7fb;
  }

  .button-basic--focused {
    background-color: #558b2f;
  }
</style>
