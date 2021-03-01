import React from 'react'
import './tooltip.css'

import { ComposedCurrency } from '../../../models/ComposedCurrency'

type FlagProps = { currencyFull: ComposedCurrency }

const Flag = ({ currencyFull }: FlagProps): JSX.Element => {
  const { flagCountryName = undefined, countryFullName = undefined } = currencyFull || {}
  const imageName = flagCountryName && `/flags/${flagCountryName}.png`

  return (
    <span className="tooltip imageWrapper">
      <img src={imageName} alt={flagCountryName || 'Image not found'} />
      {countryFullName && (
        <div data-testid="flagtooltip" className="tooltiptext normalText">
          {countryFullName}
        </div>
      )}
    </span>
  )
}

export default Flag
