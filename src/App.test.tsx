import React from 'react'
import { render, screen } from '@testing-library/react'

import App from './App'

const checkHeader = () => {
  const pageTitle = screen.getByText(/George FE test/i)
  expect(pageTitle).toBeInTheDocument()
  const search = screen.getByText(/Search/i)
  expect(search).toBeInTheDocument()
}

const checkEmptyList = () => {
  const list = screen.getByText(/There are no results./i)
  expect(list).toBeInTheDocument()
}

describe('App', () => {
  test('renders basics', () => {
    render(<App />)
    checkHeader()
    checkEmptyList()
  })

  /**
  test('renders with basic filter (no list)', () => {
    const routerParam = {
      match: { params: { filterOptions: 'peso' } },
    }
    render(<App {...routerParam} />)

    checkHeader()
    checkEmptyList()
  }) */
})
