import React from 'react'
import PropTypes from 'prop-types'

export const SearchBar = props => {
  return (
    <span className="search-bar">
      <form>
        <input type="text" name="searchText" id="searchText" />
        <button type="submit">Search</button>
      </form>
    </span>
  )
}
