import React from 'react'
import './ExchangeRate.css'

const NUM_OF_DIGITS = 2

const ExchangeRate = ({ currencyFull }) => {
  let rate = 0.0

  if (currencyFull && 'exchangeRate' in currencyFull && currencyFull.exchangeRate) {
    const baseRate = currencyFull.exchangeRate.middle
    rate = parseFloat(baseRate).toFixed(NUM_OF_DIGITS)
    return <span className="exchangeRate">{rate}</span>
  }

  return <span>Missing exchange rate</span>
}

export default ExchangeRate
