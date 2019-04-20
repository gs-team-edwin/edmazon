import React from 'react'
import history from '../history'
/**
 * This is an abstraction over next/previous buttons
 * Required props:
 * a current offset
 * a page size
 * the total count
 * a string with the URL with :offset, which will be replaced
 *     as well as any other params prefaced by :
 * an object called urlParams with other params to replace in the
 * string
 */

const PaginationButtons = props => {
  const {count, pageSize, url, urlParams} = props
  const offset = Number(props.offset)

  // build URLs with the offset plugged in
  let prevUrl = url.replace(/:offset/, offset - pageSize)
  let nextUrl = url.replace(/:offset/, offset + pageSize)

  // iterate through the urlParams to fill in other stuff in the Url
  for (let [key, value] of Object.entries(urlParams)) {
    let re = new RegExp(`:${key}`)
    prevUrl = prevUrl.replace(re, value)
    nextUrl = nextUrl.replace(re, value)
  }

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
