import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'

import Flag from './Flag'
import { ComposedCurrency } from '../../../models/ComposedCurrency'

describe('Flag', () => {
  beforeAll(() => {
    console.error = () => {}
  })

  it('Shows without props', () => {
    const { getByAltText } = render(<Flag />)
    getByAltText('Image not found')
  })

  it('Shows with props', () => {
    const currency: ComposedCurrency = {
      flagCountryName: 'hu',
      countryFullName: 'Hungary',
      currency: '',
      nameI18N: '',
      exchangeRate: {
        buy: 1.6505,
        middle: 1.683,
        sell: 1.7155,
        indicator: 0,
        lastModified: '2018-11-08T23:00:00Z',
      },
    }

    const { getByTestId } = render(<Flag currencyFull={currency} />)

    fireEvent.mouseOver(getByTestId('flagtooltip'))

    const text = screen.getByText(/Hungary/i)
    expect(text).toBeInTheDocument()
  })
})
