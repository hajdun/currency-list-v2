import axios from 'axios'

import config from '../config'
import { Country, CountryListItem, CountryListResult } from '../models/Country'
import { ComposedCurrency } from '../models/ComposedCurrency'

/**
 * A helper to clean up currencies which have no EUR exchange rates.
 * @param {*} currency to check for exchange rate
 */
const shouldRemoveRatelessCurrency = (currency: ComposedCurrency): boolean => {
  if (currency && 'exchangeRate' in currency && 'currency' in currency && currency.currency) {
    return true
  }
  return false
}

/**
 *  Clean up currency array, remove items with no exchange rate
 * @param {*} currencyList currency array to clean
 */
const filteredRatelessCurrenciesArray = (currencyList: Array<ComposedCurrency>): Array<ComposedCurrency> =>
  currencyList.filter((currency) => shouldRemoveRatelessCurrency(currency))

/**
 * Here I used a 3rd party to be able to fetch data needed for flag image display
 * and connect it to currencies. This request is cached in localStorage,
 * so it will be only re-fetched if we delete data.
 * Everything is set in a way that list is still shown if this
 * fetch is not successful, but flags and tooltips will not be shown.
 */
const getCountryCurrency = (): Promise<Array<Country>> => {
  const countryCurrency = localStorage.countryCurrency && JSON.parse(localStorage.countryCurrency)

  // cache hit
  if (countryCurrency && countryCurrency.length > 0) {
    return countryCurrency
  }

  // cache miss
  return axios
    .get(config.countryCurrencyUrl)
    .then(({ data: countryCurrencyResult }) => {
      const refinedVersion = countryCurrencyResult.map(
        ({ alpha2Code: countryIsoCode, currencies, name }: CountryListItem) => ({
          flagCountryName: countryIsoCode.toLowerCase(),
          currency: currencies[0].code,
          countryFullName: name,
        })
      )

      // set cache
      localStorage.setItem('countryCurrency', JSON.stringify(refinedVersion))

      return refinedVersion
    })
    .catch((error) => {
      console.error(error)
      return []
    })
}

/**
 * A function to map the country list to the original currency list
 * Connect them by "currency" as this is available in both responses.
 * @param countryCurrency a list of countries (country name, country ISO code, currencies array)
 * TODO: one country might have multiple currencies, this is not handled by the app
 */
const createDecoratedListWithCountryForFlag = (countryCurrency: Array<Country>): Promise<Array<ComposedCurrency>> =>
  axios.get(config.listFetchUrl).then((result: CountryListResult) => {
    if (result && result !== undefined) {
      const currencyList = result ? result.data.fx : []
      const currencyListLength = currencyList.length
      const countryCurrencyListLength = countryCurrency.length
      const composedArray = new Array<ComposedCurrency>(currencyListLength)

      // show list without flags and country names
      if (!countryCurrency || countryCurrencyListLength === 0) {
        return currencyList
      }

      // show list WITH flags and country names
      for (let j = 0; j < currencyListLength; j += 1) {
        for (let i = 0; i < countryCurrencyListLength; i += 1) {
          const isCurrencyMatch = countryCurrency[i].currency === currencyList[j].currency

          if (isCurrencyMatch) {
            composedArray.push({
              ...countryCurrency[i],
              ...currencyList[j],
            })
          }
        }
      }
      return filteredRatelessCurrenciesArray(composedArray)
    }
    return []
  })

export async function chainedGetListRequest(): Promise<Array<ComposedCurrency>> {
  const countryCurrencyList = await getCountryCurrency()
  const fullList = await createDecoratedListWithCountryForFlag(countryCurrencyList)
  return fullList
}
