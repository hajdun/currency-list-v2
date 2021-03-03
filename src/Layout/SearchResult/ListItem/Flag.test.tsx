import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import ReactTestUtils from 'react-dom/test-utils' // ES6

import Flag from './Flag'
import { ComposedCurrency } from '../../../models/ComposedCurrency'

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

describe('Flag', () => {
  it('Shows without props', () => {
    const { getByAltText } = render(<Flag />)
    expect(getByAltText('Image not found')).toBeInTheDocument()
  })

  it('Shows with props', () => {
    const { getByTestId } = render(<Flag currencyFull={currency} />)

    fireEvent.mouseOver(getByTestId('flagtooltip'))

    const text = screen.getByText(/Hungary/i)
    expect(text).toBeInTheDocument()
  })

  it('Should show replacement image if the image loads with an error', () => {
    const { getByTestId } = render(<Flag currencyFull={currency} />)

    const img = getByTestId('flagimg')
    ReactTestUtils.Simulate.error(img)

    // When no results come out of `findRenderedDOMComponentWithTag`,
    // it throws an error 'Did not find exactly one match for tag:img'
    expect(() => {
      const flagImg = getByTestId('flagimgmissing')
      expect(flagImg).toBeInTheDocument()

      const text = screen.getByText(/hu/i)
      expect(text).toBeInTheDocument()
    })
  })
})
