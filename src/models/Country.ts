export type Country = {
  flagCountryName: string // "tk",
  countryFullName: string //  "Tokelau"
  currency: string //
}

type CurrencyName = {
  code: string
}
export type CountryListItem = {
  alpha2Code: string //  "tk"
  currencies: Array<CurrencyName> //
  name: string // name of country
}
