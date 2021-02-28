import React from 'react'
import './tooltip.css'

const Flag = ({ currencyFull }) => {
  const { flagCountryName = null, countryFullName = null } = currencyFull || {}
  const imageName = flagCountryName && `/flags/${flagCountryName}.png`

  return (
    <span className="tooltip imageWrapper">
      <img src={imageName} alt={flagCountryName || 'Image not found'} />
      {countryFullName && (
        <div data-testid="flagtooltip" className="tooltiptext">
          {countryFullName}
        </div>
      )}
    </span>
  )
}

export default Flag
