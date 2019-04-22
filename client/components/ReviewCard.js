/* eslint-disable react/no-array-index-key */
import React from 'react'
import history from '../history'
import {Link} from 'react-router-dom'

const ReviewCard = props => {
  const {review} = props
  let newDate = new Date(review.createdAt)
  let day = newDate.getDate()
  let month = newDate.getMonth() + 1
  let year = newDate.getFullYear()
  return (
    <div className="review-card">
      <div key={review.id}>
        <div>
          <span className="review-title">{review.title}</span>
          <div className="stars-container">
            {Array.from({length: review.stars}).map((_, i) => (
              <span key={i} className="star">
                ⭐
              </span>
            ))}
          </div>
        </div>
        <div className="review-date">{`${month}/${day}/${year}`}</div>
        <div className="review-body">{review.body}</div>
      </div>
    </div>
  )
}

export default ReviewCard
