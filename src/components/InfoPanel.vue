<template>
    <div class="info-panel">
      <h1>{{ infoPanelData.title }}</h1>
      <p>{{ infoPanelData.text }}</p>
    </div>
</template>

<script>
    export default {
        name: "InfoPanel",
        props: ['infoPanelData']
    }
</script>

<style scoped>
  .info-panel{
    display: flex;
    flex-direction: column;

    position: absolute;
    margin-top: 7rem;
    width: 100%;
    background-color: #fff;
    text-align: center;
    height: 20rem;
    justify-content: center;
  }
  h1 {
    font-size: 3rem;
    color: #213d8f;
  }
  p{
    font-size: 2rem;
    font-weight: 600;
  }
</style>
