<template>
  <div class="filter-lane">
    <filter-dropdown v-for="filter in filtersData" v-bind:dropdown-data="filter" v-on:dropdown-selected="addFilters" v-on:dropdown-reset="removeFilter"></filter-dropdown>
    <search-button v-bind:button-data="searchButtonData" v-on:button-selected="$emit('filter-lane-search', selectedFilters)"></search-button>
  </div>
</template>

<script>
  import button from './Button';
  import filter from './Dropdown';
  import util from '../util/util';

  export default {
    name: "FilterLane",
    props: ['filterLaneData'],
    components: {
      searchButton: button,
      filterDropdown: filter
    },
    data() {
      return {
        searchButtonData: this.filterLaneData.buttonData || {text: util.getLocale('searchButtonText'), type: "normal"},
        filtersData: this.filterLaneData.filtersData || {},
        selectedFilters: null
      }
    },
    methods: {
      addFilters(evData) {
        if(this.selectedFilters == null) {
          this.selectedFilters = evData;
        } else {
          util.concatObject(this.selectedFilters, evData);
        }
      },
      removeFilter(evData) {
        if(this.selectedFilters && this.selectedFilters[evData])
          delete this.selectedFilters[evData];
      }
    }
  }
</script>

<style>
  .filter-lane {
    display: flex;
    justify-content: flex-end;
    align-items: baseline;
    position: absolute;
    width: 100%;
    margin: 1rem 0;
    z-index: 10;
  }
  .filter-name {
    display: block;
  }
</style>
