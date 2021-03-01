import React from 'react'
import './Header.css'

type IState = {
  isScrolling: boolean
}

class PageTitle extends React.Component<unknown, IState> {
  static timeout = null

  constructor(props?: unknown) {
    super(props)
    this.state = {
      isScrolling: false,
    }
  }

  componentDidMount(): void {
    window.addEventListener('scroll', this.onScroll)
  }

  componentWillUnmount(): void {
    window.removeEventListener('scroll', this.onScroll)
  }

  onScroll = (): (() => void) => {
    this.setState({ isScrolling: true })
    const timer = setTimeout(() => {
      this.setState({ isScrolling: false })
    }, 50000)
    return () => clearTimeout(timer)
  }

  render(): JSX.Element {
    const shouldDisplayAs = this.state.isScrolling ? 'none' : 'block'
    return (
      <div style={{ height: 60, display: shouldDisplayAs }}>
        <div className="pageTitle pageTitleCover normalText">George FE test</div>
      </div>
    )
  }
}
export default PageTitle
