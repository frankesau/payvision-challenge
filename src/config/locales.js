/**
 * @description Locales used by the app depending on the browser's current language.
 **/

export default function (lang) {

  const locales = {
    enGB: {
      transGridHeaderName: 'Name',
      transGridHeaderBrand: 'Brand',
      transGridHeaderLastDig: 'Last 4 digits',
      transGridHeaderAction: 'Transaction type',
      transGridHeaderAmount: 'Amount',
      transGridHeaderCurrency: 'Currency',
      payment: 'Payment',
      credit: 'Credit',
      authorize: 'Authorize',
      searchButtonText: 'Search',
      currencyLabel: 'Currency',
      actionTypeLabel: 'Transaction type',
      extendedInfoId: 'ID:',
      extendedInfoFirst6Digits: 'First 6 digits:',
      extendedInfoTrackingCode: 'Tracking code:',
      extendedInfoExpiryMonth: 'Expiry month:',
      extendedInfoBrandId: 'Brand ID:',
      extendedInfoExpiryYear: 'Expiry year:',
      noFilterTransactionTitle: 'No Transactions',
      noFilterTransactionText: 'No transactions were found with the selected filters.'
    },
    esES: {
      transGridHeaderName: 'Nombre',
      transGridHeaderBrand: 'Marca',
      transGridHeaderLastDig: 'Últimos 4 digitos',
      transGridHeaderAction: 'Tipo de transacción',
      transGridHeaderAmount: 'Monto',
      transGridHeaderCurrency: 'Moneda',
      payment: 'Pago',
      credit: 'Crédito',
      authorize: 'Autorización',
      searchButtonText: 'Buscar',
      currencyLabel: 'Moneda',
      actionTypeLabel: 'Tipo de transacción',
      extendedInfoId: 'ID:',
      extendedInfoFirst6Digits: 'Primeros 6 digitos:',
      extendedInfoTrackingCode: 'Código de seguimiento:',
      extendedInfoExpiryMonth: 'Mes cad.:',
      extendedInfoBrandId: 'ID de marca:',
      extendedInfoExpiryYear: 'Año cad.:',
      noFilterTransactionTitle: 'No Hay Transactions',
      noFilterTransactionText: 'No se encontraron transacciones con los filtros seleccionados.'
    }
  };

  return locales[lang] || locales.enGB;
}
