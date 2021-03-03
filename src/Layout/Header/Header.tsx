import React from 'react'
import './Header.css'

type HeaderProps = {
  customFilter: (event: React.ChangeEvent<HTMLInputElement>) => void
}

const Header = ({ customFilter }: HeaderProps): JSX.Element => (
  <header className="header normalText">
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

export default Header
