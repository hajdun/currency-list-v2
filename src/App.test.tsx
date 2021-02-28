import React from 'react'
import { render, screen } from '@testing-library/react'

import App from './App'

test('renders search', () => {
  render(<App />)
  const search = screen.getByText(/Search/i)
  expect(search).toBeInTheDocument()
})
