import React from 'react'
import history from '../history'
import PropTypes from 'prop-types'

const PaginationButtons = props => {
  const {count, pageSize, url, offset} = props

  // build URLs with the offset plugged in
  let prevUrl = url.replace(':offset', offset - pageSize)
  let nextUrl = url.replace(':offset', offset + pageSize)

  // display vars
  let showPrev = offset > 0
  let showNext = count > offset + pageSize

  return (
    <div className="pagination-container">
      <button
        className={`pagination-button prev ${showPrev ? '' : 'disabled'}`}
        type="button"
        onClick={() => {
          if (showPrev) history.push(prevUrl)
        }}
      >
        ◀
      </button>
      <div className="page-count-container">
        <div className="page-count-line">
          {offset + 1} to{' '}
          {offset + pageSize > count ? count : offset + pageSize}
        </div>
        <div className="page-count-line">of {count}</div>
      </div>
      <button
        className={`pagination-button next ${showNext ? '' : 'disabled'}`}
        type="button"
        onClick={() => {
          if (showNext) history.push(nextUrl)
        }}
      >
        ▶
      </button>
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
