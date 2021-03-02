import React from 'react'
import { render, screen } from '@testing-library/react'

import List from './List'

describe('List', () => {
  it('Shows without props', () => {
    render(<List />)
    const text = screen.getByText(/There are no results./i)
    expect(text).toBeInTheDocument()
  })

  it('Shows with props', () => {
    const currencyList = []
    render(<List currencyList={currencyList} />)

    const search = screen.getByText(/There are no results./i)
    expect(search).toBeInTheDocument()
  })

  it('Shows with good props', () => {
    const currencyList = []
    render(<List currencyList={currencyList} />)

    const search = screen.getByText(/There are no results./i)
    expect(search).toBeInTheDocument()
  })
})
