import React from 'react'
import PropTypes from 'prop-types'
import history from '../history'

export const SearchBar = props => {

    return (
      <span className="search-bar">
        <form onSubmit={()=>console.log(event.target.value)
          // history.push(`/products/search/${event.target.value}/page/0`)
          }>
          <input type="text" name="searchText" id="searchText" />
          <button type="submit">Search</button>
        </form>
      </span>
    )
}


