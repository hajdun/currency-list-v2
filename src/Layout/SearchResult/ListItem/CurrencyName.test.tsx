import React from 'react'
import { render, screen } from '@testing-library/react'

import CurrencyName from './CurrencyName'

describe('CurrencyName', () => {
  it('Shows without props', () => {
    render(<CurrencyName />)
    const text = screen.getByText(/Missing currency data/i)
    expect(text).toBeInTheDocument()
  })

  it('Shows with props', () => {
    const currency = { currency: 'USD', nameI18N: 'Usa dollar' }
    render(<CurrencyName currencyFull={currency} />)

    const shortName = screen.getByText(/USD/i)
    expect(shortName).toBeInTheDocument()

    const longName = screen.getByText(/Usa dollar/i)
    expect(longName).toBeInTheDocument()
  })
})
