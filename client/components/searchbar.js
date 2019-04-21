import React from 'react'
import PropTypes from 'prop-types'
import history from '../history'

export default class SearchBar extends React.Component {
  constructor() {
    super()
    this.state = {
      term: ''
    }
    this.onFormSubmit = this.onFormSubmit.bind(this)
    this.onFormChange = this.onFormChange.bind(this)
  }
  onFormSubmit(event) {
    event.preventDefault()
    let searchTerm = this.state.term
    history.push(`/products/search/${searchTerm}/offset/0`)
  }
  onFormChange(event) {
    this.setState({term: event.target.value})
  }

  render() {
    return (
      <span className="search-bar">
        <form onSubmit={this.onFormSubmit}>
          <div className="search-form-container">
            <input
              type="text"
              name="searchText"
              id="searchText"
              onChange={this.onFormChange}
            />
            <button type="submit">Search</button>
          </div>
        </form>
      </span>
    )
  }
}
