import React from 'react'
import './Header.css'

const Header = ({ filter }) => (
  <header className="header">
    <div className="fixbar">
      <div id="search">
        <label htmlFor="search">Search </label>
        <input className="searchInput" type="text" name="search" onChange={(e) => filter(e)} maxLength="20" />
      </div>
    </div>
  </header>
)

export default Header
