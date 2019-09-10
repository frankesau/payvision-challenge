<template>
  <div class="grid">
    <div class="grid-header">
      <div class="grid-header__item column-name" v-for="header in gridData.headers || []">{{ header }}</div>
    </div>

    <div class="grid-content">
      <div :class="gridContentRowSytles(rowIndex)" @click="selectRow(rowIndex)" v-for="(row, rowIndex) in gridData.data">
          <div class="grid-content__row__items">
            <div class="grid-content__row__item column-text" v-for="(item, index) in row.texts"> {{ item }}</div>
          </div>

          <transition name="extended">
            <div class="extendedInfo" v-if="isRowSelected && selectedRowIndex === rowIndex">
              <div class="extendedInfo__item" v-for="extendedInfoItem in row.extendedInfo">
                <div class="extendedInfo__item__name">{{ extendedInfoItem.name }}</div>
                <div class="extendedInfo__item__value">{{ extendedInfoItem.value }}</div>
              </div>
            </div>
          </transition>
      </div>
    </div>
  </div>
</template>

<script>
  import FilterLane from "./FilterLane";
  export default {
    name: "componentGrid",
    components: {FilterLane},
    props: ['gridData'],
    computed: {},
    data() {
      return {
        isRowSelected: false,
        selectedRowIndex: null
      }
    },
    methods: {
      selectRow: function (index) {
        /// Just close
        if(this.selectedRowIndex === null || index === this.selectedRowIndex) {
          this.isRowSelected = !this.isRowSelected;
          this.selectedRowIndex = this.isRowSelected ? index : null;
        } else {
          this.isRowSelected = true;
          this.selectedRowIndex = index;
        }
      },
      gridContentRowSytles: function (rowIndex) {
        return {
          'grid-content__row': true,
          'grid-content__row--selected': rowIndex === this.selectedRowIndex
        }
      }
    }
  }
</script>

<style scoped>
  .grid {
    display: flex;
    flex-direction: column;

    position: absolute;
    margin-top: 7rem;
    width: 100%;
    background-color: #fff;
  }

  .grid-header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;

    padding: 2.5rem 1.5rem;
    border-bottom: .1rem solid #e8ebf3;
  }

  .grid-header__item {
    width: 100%;
    display: flex;
    justify-content: space-between;
  }

  .grid-content {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .grid-content__row {
    display: flex;
    flex-flow: column;
    justify-content: space-evenly;
    align-items: center;


    cursor: pointer;
    padding: 2.5rem 1.5rem;
    border-bottom: .1rem solid #e8ebf3;
    transition: all 500ms;
  }

  .grid-content__row:hover {
    background-color: #f6f7fb;
  }

  .grid-content__row--selected {
    background-color: #f6f7fb;
  }

  .grid-content__row:last-child {
    border-bottom: none;
  }

  .grid-content__row--selected .grid-content__row__item {
    color: #4a4a4a;
    font-weight: 600;
  }

  .grid-content__row__items {
    display: flex;
    justify-content: space-evenly;
    width: 100%;
  }

  .grid-content__row__item {
    width: 100%;
  }

  .extendedInfo {
    font-family: "Source Sans Pro Regular", sans-serif;
    font-weight: 400;
    line-height: 2.5rem;
    display: flex;
    justify-content: space-around;
    flex-flow: row wrap;

    width: 100%;
    border-top: .1rem solid #e8ebf3;
    margin-top: 2.5rem;
    padding-top: 2.5rem;
  }

  .extendedInfo__item {
    display: flex;
    flex-flow: row wrap;

    flex: 0 45%;
    width: 100%;
    height: 4.5rem;
  }

  .extendedInfo__item__name {
    flex: 0 0 12rem;

    font-family: 'Source Sans Pro Regular', sans-serif;
    line-height: 2.5rem;
    font-size: 1.6rem;
    color: #213d8f;
  }

  .extendedInfo__item__value {
    font-size: 1.4rem;
    font-weight: 400;
    color: #4a4a4a;
  }

  .column-name {
    font-family: 'Source Sans Pro Semibold', sans-serif;
    font-size: 1.4rem;
    color: #213d8f;
  }

  .column-text {
    font-family: inherit;
    font-size: 14px;
  }

  /**Custom vue transitions to show extended info*/
  .extended-enter{
    opacity: 0;
  }

  .extended-enter-active{
    transition: all .3s ease-in;
  }

  .extended-leave {
    opacity: 0;
  }

  .extended-leave-active {
    transition: all .3s ease-out;
  }

  @media (max-width: 640px) {
    .extendedInfo {
      flex-flow: column wrap;
      justify-content: center;
    }

    .extendedInfo__item {
      flex: 0;
      flex-flow: nowrap;
    }
  }
</style>
