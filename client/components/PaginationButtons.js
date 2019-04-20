import React from 'react'
import history from '../history'
import PropTypes from 'prop-types'

const PaginationButtons = props => {
  const {count, pageSize, url, offset} = props

  // build URLs with the offset plugged in
  let prevUrl = url.replace(':offset', offset - pageSize)
  let nextUrl = url.replace(':offset', offset + pageSize)

  return (
    <div className="pagination-container">
      {offset > 0 && (
        <button
          className="pagination-button prev"
          type="button"
          onClick={() => {
            history.push(prevUrl)
          }}
        >
          PREV
        </button>
      )}

      {count > +offset + 20 && (
        <button
          className="pagination-button next"
          type="button"
          onClick={() => {
            history.push(nextUrl)
          }}
        >
          NEXT
        </button>
      )}
    </div>
  )
}

export default PaginationButtons

// prop types
PaginationButtons.propTypes = {
  url: PropTypes.string.isRequired,
  offset: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  count: PropTypes.number.isRequired
}
