import axios from 'axios'
import history from '../history'

// ACTION TYPES

const POST_REVIEW = 'POST_REVIEW'

//ACTION CREATORS

const postReview = review => ({type: POST_REVIEW, review})

//THUNK CREATORS

export const writeReview = (product, review) => async dispatch => {
  try {
    console.log(`REVIEW******`, review)
    const {data} = await axios.post(`/api/products/${product}/reviews`, review)
    dispatch(postReview(data))
  } catch (err) {
    console.error(err)
  }
}

//reducer
export default function(state = [], action) {
  switch (action.type) {
    case POST_REVIEW:
      return [...state, action.review]
    default:
      return state
  }
}
