import React, { ReactNode } from 'react'

interface Props {
  children: ReactNode
}

interface State {
  hasError: boolean
}

class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)

    this.state = {
      hasError: false,
    }
  }

  componentDidCatch(): void {
    this.setState({
      hasError: true,
    })
  }

  render(): JSX.Element | React.ReactNode {
    const { hasError } = this.state
    const { children } = this.props
    if (hasError) {
      return (
        <div>
          <h1>Something went wrong</h1>
        </div>
      )
    }

    return children
  }
}

export default ErrorBoundary
