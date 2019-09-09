import locales from '../config/locales';

let lang = navigator.language;
if (lang !== 'en-GB' && lang !== 'es-ES') {
  lang = 'en-GB';
}
lang = lang.replace('-', ''); // Normalize language.

const locale = locales(lang);

const cardPrefix = 'XXXX';
const brands = {
  1010: "Visa",
  1020: "MasterCard",
  1060: "Amex"
};
const actionCodes = {
  payment: 'payment',
  authorize: 'authorize',
  credit: 'credit'
};
const currencyCodes = {
  EUR: 'EUR',
  JPY: 'JPY',
  USD: 'USD'
};

// Normalize currency codes;
let currency;
let localizedCurrencyCodes = [];
for (currency in currencyCodes) {
  localizedCurrencyCodes.push(locale[currencyCodes[currency]] || currencyCodes[currency]);
}

// normalize actions;
let action;
let localizedActions = [];
for (action in actionCodes) {
  localizedActions.push(locale[actionCodes[action]] || actionCodes[action]);
}

export default {
  /**
   * @param {String} localeText - Locale key to identify the mapped locale.
   * @description Returns a localized text.
   **/
  getLocale: function (localeText) {
    return locale[localeText] || localeText;
  },

  /**
   * @description Returns the language used by the browser.
   **/
  getCurrentLanguage: function () {
    return lang;
  },

  /**
   * @description Returns a formatted card number as "<prefix> <lastCardDigits>"
   **/
  formatLastCardDigits: function (lastCardDigits) {
    return cardPrefix + ' ' + lastCardDigits;
  },

  /**
   * @description Returns a formatted card number as "<firstSixCardDigits> <prefix>"
   **/
  formatFirstSixCardDigits: function (firstSixCardDigits) {
    return firstSixCardDigits + ' ' + cardPrefix;
  },

  /**
   * @description Returns the cardPrefix. (XXXX)
   **/
  getCardPrefix: function () {
    return cardPrefix;
  },

  /**
   * @description Returns the mapped brand or "brand_<brandId>" if there's no brandId mapped.
   **/
  getBrand: function (brandId) {
    return brands[brandId] || 'brand_' + brandId;
  },

  getLocalizedActions: function () {
    return localizedActions;
  },

  getLocalizedCurrencyCodes: function () {
    return localizedCurrencyCodes;
  },

  getActionCodes: function () {
    return actionCodes;
  },

  /**
   * @description Returns the mapped action or the action itself if there's no action mapped.
   **/
  getActionType: function (action) {
    return actionCodes[action] || action;
  },

  getCurrencyCodes: function () {
    return currencyCodes;
  },
  /**
   * @description Returns the mapped currency or the currencyCode itself if there's no action mapped.
   **/
  getCurrency: function (currencyCode) {
    return currencyCodes[currencyCode] || currencyCode;
  },

  /**
   * @description Converts an object to a query string.
   **/
  objToQuery: function (queryObj) {
    let query = "?";
    let queryKey;
    for (queryKey in queryObj) {
      query += queryKey + "=" + queryObj[queryKey] + '&';
    }
    return query.slice(0, -1);
  },

  /**
   *  @param {Number} amount - Integer or Float number.
   * @description returns a fixed amount string. ie. 100,00 or 100,35
   **/
  fixedAmount: function (amount) {
    if(isNaN(amount))
      return '0,00';
    if(Number.isInteger(amount))
      return String(amount) + ',00';
    let int = parseInt(amount);
    let fix = Math.round((amount % int) * 100);

    return String(int) + ',' + String(fix);
  },

  concatObject: function (target, source) {
    return Object.assign(target, source);
  }
};
