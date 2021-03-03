import mockAxios from 'axios'
import { ComposedCurrency } from '../models/ComposedCurrency'

import { createDecoratedListWithCountryForFlag, getCountryCurrency } from './routes'
import RawList from '../mocks/RawList.json'
import CountryCurrency from '../mocks/CountryCurrency.json'
import ComposedCurrencyList from '../mocks/ComposedCurrencyList.json'

jest.mock('axios')

describe('routes', () => {
  it('Fetches currencies, creates the decorated list even having empty country list', async () => {
    const data = RawList
    const dataFx = RawList.data.fx
    mockAxios.get.mockImplementationOnce(() => Promise.resolve(data))

    await expect(createDecoratedListWithCountryForFlag([])).resolves.toEqual(dataFx)
  })

  it('Fetches currencies, creates the decorated list with a valid country list', async () => {
    const data = RawList

    mockAxios.get.mockImplementationOnce(() => Promise.resolve(data))

    await expect(createDecoratedListWithCountryForFlag(CountryCurrency)).resolves.toEqual(ComposedCurrencyList)
  })

  it('Fetch country list', async () => {
    const data = RawList
    const dataFx = RawList.data.fx
    mockAxios.get.mockImplementationOnce(() => Promise.resolve(data))

    await expect(getCountryCurrency([])).resolves.toEqual(dataFx)
  })
})
