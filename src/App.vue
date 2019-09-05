<template>
  <div id="app">
    <transaction-grid v-bind:grid-data="gridData"/>
  </div>
</template>

<script>
  let lang = 'es-ES' || navigator.language;
  if(lang !== 'en-GB' && lang !== 'es-ES') {
    lang = 'en-GB';
  }

  lang = lang.replace('-', ''); // Normalize language.
  console.log("LANG: ", lang);
  debugger;
  import axios from './config/config';
  import Grid from './components/Grid';
  import locale from './config/locales';
  console.log("---------");
  console.log(locale);


  export default {
    name: 'app',
    components: {
      transactionGrid: Grid
    },
    data() {
      return {
        gridTransactions: {},
        gridData: {}
      }
    },
    beforeMount() {
      // Get Transactions
      axios
        .get()
        .then(this.transactionsReceived)
        .catch(err => console.error(err));
    },
    methods: {
      transactionsReceived(result) {
        console.log("Transactions Received ", result);
        this.gridTransactions = result.data;
        this.setTransactionsGrid();
      },
      setTransactionsGrid() {
        console.log("Set Transactions ");
        console.log(locale);
        debugger;
        this.gridData = {
          headers:
            [
              locale[lang].transGridHeaderName,
              locale[lang].transGridHeaderBrand,
              locale[lang].transGridHeaderLastDig,
              locale[lang].transGridHeaderType,
              locale[lang].transGridHeaderAmount,
              locale[lang].transGridHeaderCurrency
            ],
          data: this.gridTransactions
        }
      }
    }
  }
</script>

<style>
  #app {

  }
</style>
