import axios from 'axios'

import config from '../config'

/**
 * A helper to clean up currencies which have no EUR exchange rates.
 * @param {*} currency to check for exchange rate
 */
const shouldRemoveRatelessCurrency = (currency) => {
  if (currency && 'exchangeRate' in currency && 'currency' in currency && currency.currency) {
    return true
  }
  return false
}

/**
 *  Clean up currency array, remove items with no exchange rate
 * @param {*} currencyList currency array to clean
 */
const filteredRatelessCurrenciesArray = (currencyList) =>
  currencyList.filter((currency) => shouldRemoveRatelessCurrency(currency)) || []

export const getCountryCurrency = () => {
  const countryCurrency = JSON.parse(localStorage.getItem('countryCurrency'))

  if (countryCurrency && countryCurrency.length > 0) {
    // cache hit
    return countryCurrency
  }

  return axios
    .get(config.countryCurrencyUrl) // cache miss
    .then(({ data: countryCurrencyResult }) => {
      const refinedVersion = countryCurrencyResult.map(({ alpha2Code: countryIsoCode, currencies, name }) => ({
        flagCountryName: countryIsoCode.toLowerCase(),
        currency: currencies[0].code,
        countryFullName: name,
      }))
      localStorage.setItem('countryCurrency', JSON.stringify(refinedVersion))
      return refinedVersion
    })
}

export const getDecoratedListWithCountryForFlag = (countryCurrency) =>
  axios.get(config.listFetchUrl).then((result) => {
    if (result && result !== undefined) {
      const currencyList = result ? result.data.fx : []

      for (let i = 0; i < countryCurrency.length; i += 1) {
        for (let j = 0; j < currencyList.length; j += 1) {
          const isCurrencyMatch = countryCurrency[i].currency === currencyList[j].currency

          if (isCurrencyMatch) {
            currencyList[j] = {
              ...currencyList[j],
              ...countryCurrency[i],
            }
          }
        }
      }

      return filteredRatelessCurrenciesArray(currencyList)
    }
    return []
  })

export async function chainedGetListRequest() {
  const currencyList = await getCountryCurrency()
  const fullList = await getDecoratedListWithCountryForFlag(currencyList)
  return fullList
}
