import React from 'react'
import './Header.css'

type HeaderProps = { filter: (event: React.ChangeEvent<HTMLInputElement>) => void }

const Header = ({ filter }: HeaderProps): JSX.Element => (
  <header className="header normalText">
    <div className="fixbar">
      <div id="search">
        <label htmlFor="search">Search </label>
        <input className="searchInput" type="text" name="search" onChange={(e) => filter(e)} maxLength={20} />
      </div>
    </div>
  </header>
)

export default Header
