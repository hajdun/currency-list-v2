import React from 'react'
import { render, screen } from '@testing-library/react'

import ExchangeRate from './ExchangeRate'

describe('ExchangeRate', () => {
  beforeAll(() => {
    console.error = () => {}
  })

  it('Shows without props', () => {
    render(<ExchangeRate />)
    const text = screen.getByText(/Missing exchange rate/i)
    expect(text).toBeInTheDocument()
  })

  it('Shows with props', () => {
    const currency = { exchangeRate: { middle: 23.67 } }
    render(<ExchangeRate currencyFull={currency} />)

    const exchangeRate = screen.getByText(/23.67/i)
    expect(exchangeRate).toBeInTheDocument()
  })

  it('Shows with bad props - missing middle', () => {
    const currency = { exchangeRate: null }
    render(<ExchangeRate currencyFull={currency} />)

    const text = screen.getByText(/Missing exchange rate/i)
    expect(text).toBeInTheDocument()
  })

  it('Shows with bad props - bad middle', () => {
    const currency = { exchangeRate: { middle: null } }
    render(<ExchangeRate currencyFull={currency} />)

    const text = screen.getByText(/NaN/i)
    expect(text).toBeInTheDocument()
  })

  it('Reduces to 2 decimal digits', () => {
    const currency = { exchangeRate: { middle: 23.670000567 } }
    render(<ExchangeRate currencyFull={currency} />)

    const exchangeRate = screen.getByText(/23.67/i)
    expect(exchangeRate).toBeInTheDocument()
  })
})
