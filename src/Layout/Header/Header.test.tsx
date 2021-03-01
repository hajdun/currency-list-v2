import React from 'react'
import { render, screen } from '@testing-library/react'

import Header from './Header'

describe('Header', () => {
  it('Shows without props', () => {
    render(<Header />)
    const text = screen.getByText(/Search/i)
    expect(text).toBeInTheDocument()
  })

  it('Shows with props', () => {
    const filter = () => {}
    render(<Header filter={filter} />)
    const text = screen.getByText(/Search/i)
    expect(text).toBeInTheDocument()
  })
})
