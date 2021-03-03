import React, { SyntheticEvent } from 'react'
import { fireEvent, render, screen } from '@testing-library/react'

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

  it('Should call onChange prop', () => {
    const onSearchMock = jest.fn()

    const { getByTestId } = render(<Header filter={onSearchMock} />)
    const input = getByTestId('headersearchinput')
    const event = {
      target: { value: 'typedValue' },
    }
    fireEvent.change(input, event)
    expect(onSearchMock).toHaveBeenCalled()
  })
})
