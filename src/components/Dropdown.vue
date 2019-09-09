<template>
  <ul class="dropdown__container" :class="dropdownContainerStyle">
    <li class="dropdown__container__label" @click="toggleDropdown">
      <div class="dropdown__container__label__text">{{ dropdownLabel }}</div>
      <div :class="dropdownArrowState"></div>
    </li>
    <transition name="showdropdown">
      <li v-if="dropdownState" class="dropdown__container__content">
        <ul class="dropdown__container__items">
          <li :class="dropdownContainerItemStyle(key)" @click="dropdownSelected(dropdownData.filter, val)"
              v-for="(val, key) in dropdownData.filters" v-bind:key="key">{{ getLocale(val) }}
          </li>
        </ul>
      </li>
    </transition>
  </ul>
</template>

<script>
  import util from '../util/util';

  export default {
    name: "Dropdown",
    props: ['dropdownData'],
    computed: {
      computedDropdownLabel: function () {
        return util.getLocale(this.dropdownLabel);
      },
      dropdownArrowState: function () {
        return {
          'dropdown__container__arrowDown': this.dropdownState === false,
          'dropdown__container__arrowUp': this.dropdownState === true
        }
      },
      dropdownContainerStyle: function () {
        return {
          'dropdown__container--uncollapsed': this.dropdownState === true
        }
      }
    },
    data() {
      return {
        dropdownState: false,
        dropdownSelection: null,
        dropdownSelectionKey: null,
        dropdownSelectionLabel: "",
        dropdownLabel: this.getLocale(this.dropdownData.label)
      }
    },
    methods: {
      getLocale: function (locale) {
        return util.getLocale(locale);
      },
      dropdownContainerItemStyle: function (key) {
        return {
          'dropdown__container__item': true,
          'dropdown__container__item--selected': this.dropdownSelection && this.dropdownSelection[this.dropdownSelectionKey] === key
        }
      },
      toggleDropdown: function (reset) {
        this.dropdownState = !this.dropdownState;
        if (this.dropdownState) {
          // Set Label to the type of label being selected.
          this.dropdownLabel = this.getLocale(this.dropdownData.label);
        } else if (reset) {
          // Resets selection.
          this.dropdownSelection = null;
          this.dropdownLabel = this.getLocale(this.dropdownData.label);
          this.$emit('dropdown-reset', this.dropdownSelectionKey);
          this.dropdownSelectionKey = null;
        }
      },
      dropdownSelected: function (key, val) {
        if (!this.dropdownSelection)
          this.dropdownSelection = {};

        this.dropdownSelection[key] = val;
        this.dropdownSelectionKey = key;
        this.dropdownLabel = this.dropdownSelectionLabel = this.getLocale(val);
        this.toggleDropdown();
        this.$emit('dropdown-selected', this.dropdownSelection);
      }
    }
  }
</script>

<style scoped>
  .dropdown {

  }

  .dropdown__container {
    display: flex;
    flex-flow: column;
    list-style: none;
    border: .1rem solid #213d8f;
    border-radius: .2rem;
    background-color: #fff;
    transition: all 500ms;
    height: 100%;
    min-width: 15rem;
    cursor: pointer;
    margin-right: 1rem;
  }

  .dropdown__container--uncollapsed {
    box-shadow: .2rem .2rem 1rem 0 #4a4a4a;
    border: .1rem solid #1db9de;
  }

  .dropdown__container__label {
    display: flex;
    padding: 1rem 1rem;
    align-items: center;
    justify-content: space-between;
    height: 100%;
    color: #213d8f;
    font-family: 'Source Sans Pro Semibold', sans-serif;
    font-size: 1.4rem;
  }

  .dropdown__container__arrowDown {
    content: '';
    display: flex;
    justify-content: flex-end;
    width: .8rem;
    height: .8rem;
    margin-left: 1rem;

    border-bottom: .2rem solid #213d8f;
    border-right: .2rem solid #213d8f;
    transition: transform 200ms ease-in;
    transform: rotateZ(45deg);
  }

  .dropdown__container__arrowUp {
    content: '';
    display: flex;
    justify-content: flex-end;
    width: .8rem;
    height: .8rem;
    margin-left: 1rem;

    border-bottom: .2rem solid #213d8f;
    border-right: .2rem solid #213d8f;
    transition: transform 200ms ease-in;
    transform: rotateZ(-135deg);
  }

  .dropdown__container__content {
    visibility: visible;
  }

  .showdropdown-enter{
    opacity: 0;
    visibility: hidden;
    display: none;
  }
  .showdropdown-enter-active {
    transition: all .5s ease;
  }

  .showdropdown-leave {

  }

  .showdropdown-leave-active {
    transition: opacity .5s ease;
    opacity: 0;
    visibility: hidden;
    display: none;
  }



  .dropdown__container__items {
    border-top: .1rem solid #e8ebf3;
    margin: .1rem 0 0;
    color: #909ec7;
  }

  .dropdown__container__item {
    font-size: 1.4rem;
    font-weight: 600;
    cursor: pointer;
    display: none;
    padding: 1rem 0 1rem 1rem;
    transition: all 300ms ease;
  }

  .dropdown__container__item:hover,
  .dropdown__container__item--selected {
    background-color: #e8ebf3;
    color: #213d8f;
  }

  .dropdown__container--uncollapsed .dropdown__container__item {
    display: flex;
    flex-flow: column;
    justify-content: center;
  }
</style>
