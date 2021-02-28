import React, { ReactNode } from 'react'

interface Props {
  children: ReactNode
}

interface State {
  hasError: boolean
}

class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: any) {
    super(props)

    this.state = {
      hasError: false,
    }
  }

  componentDidCatch() {
    this.setState({
      hasError: true,
    })
  }

  render() {
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
