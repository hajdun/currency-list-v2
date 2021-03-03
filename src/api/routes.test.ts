import mockAxios from 'axios'

import { fetchCurrencyList, getCountryCurrency } from './routes'
import C2RawCurrencyList from '../mocks/C2RawCurrencyList.json'
import C2CountryCurrency from '../mocks/C2CountryCurrency.json'
import C2RawCountryCurrency from '../mocks/C2RawCountryCurrency.json'

jest.mock('axios')

describe('routes', () => {
  it('fetchCurrencyList', async () => {
    const data = C2RawCurrencyList
    const dataFx = C2RawCurrencyList.data.fx
    mockAxios.get.mockImplementationOnce(() => Promise.resolve(data))
    await expect(fetchCurrencyList()).resolves.toEqual(dataFx)
  })

  it('getCountryCurrency', async () => {
    const rawData = { data: C2RawCountryCurrency }
    const data = C2CountryCurrency

    mockAxios.get.mockImplementationOnce(() => Promise.resolve(rawData))
    await expect(getCountryCurrency()).resolves.toEqual(data)
  })
})
