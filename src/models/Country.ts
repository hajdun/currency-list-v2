export type Country = {
  flagCountryName: string // "af",
  countryFullName: string // "Afghan afghani"
  currency: string // "AFN"
}

type CurrencyName = {
  code: string // "AFN"
  name: string // "Afghan afghani"
  symbol: string // "؋"
}

export type CountryListItem = {
  alpha2Code: string // "AF"
  currencies: Array<CurrencyName>
  name: string // "Afghanistan"
}

type DataFx = {
  fx: Array<Country>
}

export type CountryListResult = {
  data: DataFx
}
