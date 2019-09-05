<template>
  <div class="grid">
    <h1>Gridings ;)</h1>

    <div id="grid-flex">
      <div v-for="header in gridData.headers || []">
        <div>{{ header }}</div>
      </div>
      <div v-for="item in gridData.data || []">
        <div>{{ item }}</div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "componentGrid",
    props: ['gridData']
  }
</script>

<style scoped>
  .grid {
  }

  .hidden-details {
    font-family: "Source Sans Pro Regular", sans-serif;
    font-weight: 400;
    line-height: 25px;
  }

  .hidden-details-title {
    font-family: inherit;
    line-height: inherit;
  }

  .column-name {
    font-family: 'Source Sans Pro Semibold', sans-serif;
    font-weight: 600;
    font-size: 14px;
  }

  .column-text {
    font-family: inherit;
    font-size: 14px;
  }
</style>
