import React from 'react'
import { render, screen } from '@testing-library/react'

import ExchangeRate from './ExchangeRate'

const extraCurrencyProps = {
  currency: 'NZD',
  flagCountryName: 'tk',
  countryFullName: 'Tokelau',
}

describe('ExchangeRate', () => {
  it('Shows without props', () => {
    render(<ExchangeRate />)
    const text = screen.getByText(/Missing exchange rate/i)
    expect(text).toBeInTheDocument()
  })

  it('Shows with props', () => {
    const currency = {
      ...extraCurrencyProps,
      exchangeRate: {
        middle: 23.67,
      },
    }
    render(<ExchangeRate currencyFull={currency} />)

    const exchangeRate = screen.getByText(/23.67/i)
    expect(exchangeRate).toBeInTheDocument()
  })

  it('Shows with bad props - missing middle', () => {
    const currency = {
      ...extraCurrencyProps,
      exchangeRate: undefined,
    }
    render(<ExchangeRate currencyFull={currency} />)

    const text = screen.getByText(/Missing exchange rate/i)
    expect(text).toBeInTheDocument()
  })

  it('Shows with bad props - bad middle', () => {
    const currency = {
      ...extraCurrencyProps,
      exchangeRate: {
        middle: undefined,
      },
    }
    render(<ExchangeRate currencyFull={currency} />)

    const text = screen.getByText(/0/i)
    expect(text).toBeInTheDocument()
  })

  it('Reduces to 2 decimal digits', () => {
    const currency = {
      ...extraCurrencyProps,
      exchangeRate: {
        middle: 23.670000567,
      },
    }
    render(<ExchangeRate currencyFull={currency} />)

    const exchangeRate = screen.getByText(/23.67/i)
    expect(exchangeRate).toBeInTheDocument()
  })
})
