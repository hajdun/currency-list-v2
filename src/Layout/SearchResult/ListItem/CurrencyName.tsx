import React from 'react'

import './tooltip.css'

import { ComposedCurrency } from '../../../models/ComposedCurrency'

type CurrencyNameProps = { currencyFull: ComposedCurrency }

const CurrencyName = ({ currencyFull }: CurrencyNameProps): JSX.Element => {
  if (!currencyFull || !currencyFull.currency || !currencyFull.nameI18N) {
    return <span>Missing currency data</span>
  }

  const shortName = currencyFull.currency
  const longName = currencyFull.nameI18N

  return (
    <span className="tooltip normalText">
      {shortName}
      {longName && <span className="tooltiptext">{longName}</span>}
    </span>
  )
}

export default CurrencyName
