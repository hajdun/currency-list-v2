import { ComposedCurrency, Currency } from '../models/ComposedCurrency'

export const filterForCurrency = (
  filterCondition: string,
  fullCurrenyList: Array<ComposedCurrency | Currency>
): Array<ComposedCurrency | Currency> =>
  fullCurrenyList.filter((elem: ComposedCurrency | Currency) => {
    const stringifiedCurrency = JSON.stringify(elem).toLowerCase()
    return stringifiedCurrency.includes(filterCondition.toLowerCase())
  })
