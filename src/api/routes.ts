import axios from 'axios'

import config from '../config'
import { Country, CountryListItem } from '../models/Country'
import { Currency, ComposedCurrency, CurrencyListResult } from '../models/ComposedCurrency'

/**
 * A helper to clean up currencies which have no EUR exchange rates.
 * @param {*} currency to check for exchange rate
 */
const shouldRemoveRatelessCurrency = (currency: Currency): boolean => {
  if (currency && 'exchangeRate' in currency && 'currency' in currency && currency.currency) {
    return true
  }
  return false
}

/**
 *  Clean up currency array, remove items with no exchange rate
 * @param {*} currencyList currency array to clean
 */
const filteredRatelessCurrenciesArray = (currencyList: Array<Currency>): Array<Currency> =>
  currencyList.filter((currency) => shouldRemoveRatelessCurrency(currency))

const setCache = (cacheItemName: string, cacheItem: string): void => {
  localStorage.setItem(cacheItemName, JSON.stringify(cacheItem))
}

/**
 * Here I used a 3rd party to be able to fetch data needed for flag image display
 * and connect it to currencies. This request is cached in localStorage,
 * so it will be only re-fetched if we delete data.
 * Everything is set in a way that list is still shown if this
 * fetch is not successful, but flags and tooltips will not be shown.
 */
export const getCountryCurrency = (): Promise<Array<Country>> => {
  const cachedCountryList = localStorage.countryCurrency && JSON.parse(localStorage.countryCurrency)
  if (cachedCountryList && cachedCountryList.length > 0) {
    return cachedCountryList
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
      setCache('countryCurrency', refinedVersion)

      return refinedVersion
    })
    .catch((error) => {
      console.error(error)
      return []
    })
}

export const fetchCurrencyList = (): Promise<Array<Currency>> =>
  axios.get(config.listFetchUrl).then((result: CurrencyListResult) => {
    if (result && result !== undefined && result.data) {
      const currencyList = result ? result.data.fx : []
      return filteredRatelessCurrenciesArray(currencyList)
    }
    return []
  })

/**
 * A function to map the country list to the original currency list
 * Connect them by "currency" as this is available in both responses.
 * @param countryCurrency a list of countries (country name, country ISO code, currencies array)
 * @param currencyList is the currency list received (the mock link)
 * TODO: one country might have multiple currencies, this is not handled by the app
 */
export const createDecoratedListWithCountryForFlag = (
  countryCurrency: Array<Country>,
  currencyList: Array<Currency>
): Array<ComposedCurrency> | Array<Currency> => {
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
  return composedArray
}

export async function chainedGetListRequest(): Promise<Array<ComposedCurrency> | Array<Currency>> {
  const countryCurrencyList = await getCountryCurrency()
  const currencyList = await fetchCurrencyList()
  const combineLists = createDecoratedListWithCountryForFlag(countryCurrencyList, currencyList)
  return combineLists
}
