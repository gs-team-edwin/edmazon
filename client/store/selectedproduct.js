import axios from 'axios'
import history from '../history'

// ACTION TYPES
const SELECT_PRODUCT = 'SELECT_PRODUCT'

//ACTION CREATORS
const selectProduct = product => ({type: SELECT_PRODUCT, product})

//THUNK CREATORS
export const getSingleProduct = productId => async dispatch => {
  try {
    const res = await axios.get(`/api/products/${productId}`)
    dispatch(selectProduct(res.data))
  } catch (err) {
    console.error(err)
  }
}

//reducer
export default function(state = {}, action) {
  switch (action.type) {
    case SELECT_PRODUCT:
      return action.product
    default:
      return state
  }
}
