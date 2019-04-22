import React from 'react'
import history from '../history'
import {Link} from 'react-router-dom'

const ReviewCard = props => {
  const {review} = props
  let newDate = new Date()
  let day = newDate.getDate()
  let month = newDate.getMonth() + 1
  let year = newDate.getFullYear()
  return (
    <div className="review-card">
      <div key={review.id}>
        <div className="review-title">{review.title}</div>
        <div className="review-date">{`${month}/${day}/${year}`}</div>
        <div>{review.body}</div>
      </div>
    </div>
  )
}

export default ReviewCard
