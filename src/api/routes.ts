import axios from 'axios'

import config from '../config'
import { CountryListItem, Country } from '../models/Country'
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
 */
export const getCountryCurrency = (): Promise<Array<Country>> => {
  const countryCurrency = JSON.parse(localStorage.countryCurrency)

  // cache hit
  if (countryCurrency && countryCurrency.length > 0) {
    return countryCurrency
  }

  // cache miss
  return axios.get(config.countryCurrencyUrl).then(({ data: countryCurrencyResult }) => {
    const refinedVersion = countryCurrencyResult.map(
      ({ alpha2Code: countryIsoCode, currencies, name }: CountryListItem) => ({
        flagCountryName: countryIsoCode.toLowerCase(),
        currency: currencies[0].code,
        countryFullName: name,
      })
    )
    localStorage.setItem('countryCurrency', JSON.stringify(refinedVersion))
    return refinedVersion
  })
}

export const getDecoratedListWithCountryForFlag = (countryCurrency: Array<Country>): Promise<Array<ComposedCurrency>> =>
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

export async function chainedGetListRequest(): Promise<Array<ComposedCurrency>> {
  const currencyList = await getCountryCurrency()
  const fullList = await getDecoratedListWithCountryForFlag(currencyList)
  return fullList
}
