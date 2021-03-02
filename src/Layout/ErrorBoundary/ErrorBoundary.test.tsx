import React from 'react'
import { render, screen } from '@testing-library/react'

import ErrorBoundary from './ErrorBoundary'

const Throws = () => {
  throw new Error('Oh no!')
}

describe('Error Boundary', () => {
  it('Shows error when an error is caught', () => {
    render(
      <ErrorBoundary>
        <div>
          <Throws />
        </div>
      </ErrorBoundary>
    )
    const baseError = screen.getByText(/Something went wrong/i)
    expect(baseError).toBeInTheDocument()
  })

  it('Displays children if no error', () => {
    render(
      <ErrorBoundary>
        <h1>I am a kid</h1>
      </ErrorBoundary>
    )
    const error = screen.getByText(/I am a kid/i)
    expect(error).toBeInTheDocument()
  })
})
