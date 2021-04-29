import React, { useState } from 'react'
import { useScrollPosition } from '@n8tb1t/use-scroll-position'

import './Header.css'

type HeaderProps = {
  customFilter: (event: React.ChangeEvent<HTMLInputElement>) => void
}

const Header = ({ customFilter }: HeaderProps): JSX.Element => {
  const [headerStyle, setHeaderStyle] = useState({
    transition: 'all 200ms ease-in',
  })

  useScrollPosition(
    ({ prevPos, currPos }) => {
      const isPageTitleVisible = currPos.y > prevPos.y

      const shouldBeStyle = {
        transition: `all 200ms ${isPageTitleVisible ? 'ease-in' : 'ease-out'}`,
        transform: isPageTitleVisible ? 'none' : 'translate(0, -100%)',
      }

      if (JSON.stringify(shouldBeStyle) === JSON.stringify(headerStyle)) {
        return
      }

      setHeaderStyle(shouldBeStyle)
    },
    [headerStyle]
  )

  return (
    <header className="header normalText" style={{ ...headerStyle }}>
      <div className="fixbar">
        <div id="search">
          <label htmlFor="search">Search </label>
          <input
            data-testid="headersearchinput"
            className="searchInput"
            type="text"
            name="search"
            onChange={(e) => customFilter(e)}
            maxLength={20}
          />
        </div>
      </div>
    </header>
  )
}

export default Header
