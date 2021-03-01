import React from 'react'
import { render, screen } from '@testing-library/react'

import List from './List'

describe('List', () => {
  it('Shows without props', () => {
    render(<List />)
    const text = screen.getByText(/search/i)
    expect(text).toBeInTheDocument()
  })

  it('Shows with props', () => {
    const currencyList = []
    render(<List currencyList={currencyList} />)

    const search = screen.getByText(/search/i)
    expect(search).toBeInTheDocument()
  })
})
