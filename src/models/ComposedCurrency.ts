import type { Rate } from './Rate'

export type ComposedCurrency = {
  currency: string // "NZD",
  precision?: number // 2,
  denominations?: Array<number> // [ 100, 50, 20, 10, 5 ],
  exchangeRate?: Rate
  banknoteRate?: Rate
  flags?: Array<string> // [ "provided" ],
  flagCountryName: string // "tk",
  countryFullName: string //  "Tokelau"
  nameI18N?: string
}
