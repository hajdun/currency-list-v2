import { filterForCurrency } from './searchUtils'

import C2ComposedCurrencyList from '../mocks/C2ComposedCurrencyList.json'

describe('filterForCurrency', () => {
  it('filterForCurrency', () => {
    const data = C2ComposedCurrencyList
    const filteredList = filterForCurrency('AFN', data)
    const listAfterFiltering = [C2ComposedCurrencyList[0]]
    expect(filteredList).toEqual(listAfterFiltering)
  })
})
