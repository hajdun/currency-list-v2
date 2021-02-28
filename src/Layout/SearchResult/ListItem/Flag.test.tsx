import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'

import Flag from './Flag'

describe('Flag', () => {
  beforeAll(() => {
    console.error = () => {}
  })

  it('Shows without props', () => {
    const { getByAltText } = render(<Flag />)
    getByAltText('Image not found')
  })

  it('Shows with props', () => {
    const currency = { flagCountryName: 'hu', countryFullName: 'Hungary' }

    const { getByTestId } = render(<Flag currencyFull={currency} />)

    fireEvent.mouseOver(getByTestId('flagtooltip'))

    const text = screen.getByText(/Hungary/i)
    expect(text).toBeInTheDocument()
  })
})
