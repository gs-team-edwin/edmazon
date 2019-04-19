import axios from 'axios'
import history from '../history'

// ACTION TYPES
const GET_ALL_REVIEWS = 'GET_ALL_REVIEWS'
const POST_REVIEW = 'POST_REVIEW'

//ACTION CREATORS
const getReviews = reviews => ({type: GET_ALL_REVIEWS, reviews})
const postReview = review => ({type: POST_REVIEW, review})

//THUNK CREATORS
export const getAllReviews = () => async dispatch => {
  try {
    const res = await axios.get('/api/products/:id')
    dispatch(getReviews(res.data))
  } catch (err) {
    console.error(err)
  }
}

export const writeReview = review => async dispatch => {
  try {
    const {data} = await axios.post(`/api/products/`, review)
    dispatch(postReview(data))
  } catch (err) {
    console.error(err)
  }
}

//reducer
export default function(state = [], action) {
  switch (action.type) {
    case GET_ALL_REVIEWS:
      return action.reviews
    case POST_REVIEW:
      return [...state, action.review]
    default:
      return state
  }
}
