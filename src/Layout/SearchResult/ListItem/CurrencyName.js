import React from 'react'
import './tooltip.css'

const CurrencyName = ({ currencyFull }) => {
  if (!currencyFull || !currencyFull.currency || !currencyFull.nameI18N) {
    return <span>Missing currency data</span>
  }

  const shortName = currencyFull.currency
  const longName = currencyFull.nameI18N

  return (
    <span className="tooltip">
      {shortName}
      {longName && <span className="tooltiptext">{longName}</span>}
    </span>
  )
}

export default CurrencyName
