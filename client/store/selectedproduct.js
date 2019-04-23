import axios from 'axios'
import history from '../history'

// ACTION TYPES
const SELECT_PRODUCT = 'SELECT_PRODUCT'
const POST_REVIEW = 'POST_REVIEW'

//ACTION CREATORS
const selectProduct = product => ({type: SELECT_PRODUCT, product})
const postReview = review => ({type: POST_REVIEW, review})

//THUNK CREATORS
export const getSingleProduct = productId => async dispatch => {
  try {
    const res = await axios.get(`/api/products/${productId}`)
    dispatch(selectProduct(res.data))
  } catch (err) {
    console.error(err)
  }
}

export const writeReview = (product, review) => async dispatch => {
  try {
    const {data} = await axios.post(`/api/products/${product}/reviews`, review)
    dispatch(postReview(data))
  } catch (err) {
    console.error(err)
  }
}

//reducer
export default function(state = {}, action) {
  switch (action.type) {
    case SELECT_PRODUCT:
      return action.product
    case POST_REVIEW:
      return {...state, reviews: [...state.reviews, action.review]}
    default:
      return state
  }
}
