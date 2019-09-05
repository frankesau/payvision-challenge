export default {
  enGB : {
    transGridHeaderName: 'Name',
    transGridHeaderBrand: 'Brand',
    transGridHeaderLastDig: 'Last 4 digits',
    transGridHeaderType: 'Transaction type',
    transGridHeaderAmount: 'Amount',
    transGridHeaderCurrency: 'Currency'
  },
  esES : {
    transGridHeaderName: 'Nombre',
    transGridHeaderBrand: 'Marca',
    transGridHeaderLastDig: 'Últimos 4 digitos',
    transGridHeaderType: 'Tipo de transacción',
    transGridHeaderAmount: 'Monto',
    transGridHeaderCurrency: 'Moneda'
  }
}
/*
export default function (lang) {
  if(!(lang === 'en-GB' || lang === 'es-ES')) {
    lang = 'en-GB';
  }

  const normalizedLang = lang.replace('-', '');
  const locales = {
    'enGB' : {
      transGridHeaderName: 'Name',
      transGridHeaderBrand: 'Brand',
      transGridHeaderLastDig: 'Last 4 digits',
      transGridHeaderType: 'Transaction type',
      transGridHeaderAmount: 'Amount',
      transGridHeaderCurrency: 'Currency'
    },
    'esES' : {
      transGridHeaderName: 'Nombre',
      transGridHeaderBrand: 'Marca',
      transGridHeaderLastDig: 'Últimos 4 digitos',
      transGridHeaderType: 'Tipo de transacción',
      transGridHeaderAmount: 'Monto',
      transGridHeaderCurrency: 'Moneda'
    }
  };

  return locales[normalizedLang];
}*/
