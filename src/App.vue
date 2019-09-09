<template>
  <div id="app">
    <filter-lane v-bind:filter-lane-data="filterLaneData" v-on:filter-lane-search="requestFilteredTransactions"></filter-lane>
    <transaction-grid v-if="!filterTransactionError" v-bind:grid-data="gridData"/>
    <info-panel v-else v-bind:info-panel-data="infoPanelData"></info-panel>
  </div>
</template>

<script>
  import FilterLane from "./components/FilterLane";
  import InfoPanel from "./components/InfoPanel";
  import axios from './config/config';
  import Grid from './components/Grid';
  import util from './util/util';

  let lang = util.getCurrentLanguage();

  export default {
    name: 'app',
    components: {
      FilterLane,
      transactionGrid: Grid,
      infoPanel: InfoPanel
    },
    data() {
      return {
        gridTransactions: {},
        gridData: {},
        infoPanelData: {},
        filterTransactionError: false,
        filterLaneData: {
          filtersData: [
            {
              label: 'actionTypeLabel',
              filter: 'action',
              filters: util.getActionCodes()
            },
            {
              label: 'currencyLabel',
              filter: 'currencyCode',
              filters: util.getCurrencyCodes() // TODO DONE! Array ['USD', 'EUR'] === > {}} -- DONE!
            }
          ],
          buttonData: {
            type: {'success': true},
            text: 'searchButtonText',
            action: this.searchButtonAction
          }
        }
      }
    },
    beforeMount() {
      // Get Transactions
      this.requestTransactions();
    },
    methods: {
      requestTransactions() {
        axios
          .get()
          .then(this.transactionsReceived)
          .catch(err => console.error(err));
      },
      requestFilteredTransactions(filters) {
        if (filters) {
          let filterQuery = util.objToQuery(filters);

          axios
            .get(filterQuery)
            .then(this.transactionsReceived)
            .catch(this.requestFilteredTransactionsFailed)
        }
      },

      requestFilteredTransactionsFailed(err) {
        this.infoPanelData.title = util.getLocale('noFilterTransactionTitle');
        this.infoPanelData.text = util.getLocale('noFilterTransactionText');
        debugger;
        this.filterTransactionError = true;
      },

      transactionsReceived(result) {
        console.log("Transactions Received ", result);
        this.filterTransactionError = false;
        this.gridTransactions = result.data;
        this.setTransactionsGrid();
      },
      /**
       * @param {Array} transactions - Transactions data received.
       * @description Format data for the grid component.
       **/
      formatTransactionsData(transactions) {
        console.log("Format Transactions Data");
        let i = 0;
        let iMax = transactions.length;
        let data = [];
        let cardInfo;
        let transaction;

        for (; i < iMax; i++) {
          transaction = transactions[i];
          cardInfo = transaction.card;

          data.push(
            {
              texts: [
                cardInfo.holderName,
                util.getBrand(transaction.brandId),
                util.formatLastCardDigits(transaction.card.lastFourDigits),
                util.getLocale(transaction.action) || transaction.action,
                util.fixedAmount(transaction.amount),
                util.getLocale(transaction.currencyCode) || transaction.currencyCode
              ],
              extendedInfo: [
                {name: 'ID: ', value: transaction.id},
                {name: 'First 6 digits: ', value: util.formatFirstSixCardDigits(cardInfo.firstSixDigits)},
                {name: 'Tracking code: ', value: transaction.trackingCode},
                {name: 'Expiry month: ', value: cardInfo.expiryMonth},
                {name: 'Brand ID: ', value: transaction.brandId},
                {name: 'Expiry year: ', value: cardInfo.expiryYear}
              ]
            }
          );
        }
        return data;
      },
      setTransactionsGrid() {
        console.log("Set Transactions ");
        let headers = [
          util.getLocale("transGridHeaderName"),
          util.getLocale("transGridHeaderBrand"),
          util.getLocale("transGridHeaderLastDig"),
          util.getLocale("transGridHeaderAction"),
          util.getLocale("transGridHeaderAmount"),
          util.getLocale("transGridHeaderCurrency")
        ];

        let data = this.formatTransactionsData(this.gridTransactions);

        this.gridData = {
          headers,
          data
        }
      }
    }
  }
</script>

<style>
  html {
    min-width: 30rem;
    font-size: 62.5%;
    font-family: 'Source Sans Pro', sans-serif, Serif;
  }

  body {
    box-sizing: border-box;
    background-color: #e8ebf3;
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: inherit;
  }

  #app {
    margin: 3rem;
    position: relative;
  }


</style>
