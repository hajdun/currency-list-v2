import React, { SyntheticEvent } from 'react'
import './tooltip.css'
import './Flag.css'
import { ComposedCurrency } from '../../../models/ComposedCurrency'

type FlagProps = { currencyFull: ComposedCurrency }

interface FlagState {
  error: boolean
  imgSrc: string | undefined
  flagCountryName: string | undefined
  countryFullName: string | undefined
}

class Flag extends React.Component<FlagProps, FlagState> {
  constructor(props: FlagProps) {
    super(props)
    const { flagCountryName = undefined, countryFullName = undefined } = this.props.currencyFull || {}
    const imageName = flagCountryName && `/flags/${flagCountryName}.png`

    this.state = {
      error: false,
      imgSrc: imageName,
      flagCountryName,
      countryFullName,
    }
  }

  onError = (event: SyntheticEvent<HTMLImageElement, Event>): void => {
    const imgFallback = '/flags/imageNotFound.png'
    if (!this.state.error && event.type === 'error') {
      this.setState({
        error: true,
        imgSrc: imgFallback,
      })
    }
  }

  render(): JSX.Element {
    const { imgSrc, flagCountryName, countryFullName, error } = this.state

    return (
      <span className="tooltip imageWrapper flagImgContainer">
        <img
          data-testid="flagimg"
          className="flagImg"
          src={imgSrc}
          alt={flagCountryName || 'Image not found'}
          width="60px"
          height="40px"
          onError={(event) => this.onError(event)}
        />
        {error && (
          <div data-testid="flagimgmissing" className="flagImgMissing">
            {flagCountryName}
          </div>
        )}
        {countryFullName && (
          <div data-testid="flagtooltip" className="tooltiptext normalText">
            {countryFullName}
          </div>
        )}
      </span>
    )
  }
}

export default Flag
