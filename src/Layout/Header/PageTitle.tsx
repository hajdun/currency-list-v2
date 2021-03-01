import React, { useEffect } from 'react'
import './Header.css'

type IState = {
  isScrolling: boolean
}

class PageTitle extends React.Component<any, IState> {
  static timeout = null

  constructor(props: any) {
    super(props)
    this.state = {
      isScrolling: false,
    }
  }

  componentDidMount() {
    window.addEventListener('scroll', this.onScroll)
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.onScroll)
  }

  onScroll = () => {
    this.setState({ isScrolling: true })
    const timer = setTimeout(() => {
      this.setState({ isScrolling: false })
    }, 50000)
    return () => clearTimeout(timer)
  }

  render() {
    const shouldDisplayAs = this.state.isScrolling ? 'none' : 'block'
    return (
      <div style={{ height: 60, display: shouldDisplayAs }}>
        <div className="pageTitle pageTitleCover ">George FE test</div>
      </div>
    )
  }
}
export default PageTitle
