import React from 'react'

import { ComposedCurrency } from '../../../models/ComposedCurrency'

type ExchangeRateProps = { currencyFull: ComposedCurrency }

const ExchangeRate = ({ currencyFull }: ExchangeRateProps): JSX.Element => {
  let rate = 1.0
  const NUM_OF_DIGITS = 2

  if (currencyFull && 'exchangeRate' in currencyFull && currencyFull.exchangeRate) {
    const baseRate = currencyFull.exchangeRate.middle || rate
    // baseRate = 1 / baseRate
    rate = parseFloat(baseRate.toFixed(NUM_OF_DIGITS))
    return <span className="exchangeRate normalText">{rate}</span>
  }

  return <span>Missing exchange rate</span>
}

export default ExchangeRate
