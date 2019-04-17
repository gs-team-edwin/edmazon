import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const SINGLE_PRODUCT = 'SINGLE_PRODUCT'
//const REMOVE_PRODUCT = 'REMOVE_PRODUCT'

// INITIAL STATE
const defaultProducts = {}

//ACTION CREATORS
const singleProduct = product => ({type: SINGLE_PRODUCT, product})
//const removeProduct = () => ({type: REMOVE_PRODUCT})

//THUNK CREATORS
export const getSingleProduct = productId => async dispatch => {
  try {
    const res = await axios.get(`/api/product/${productId}`)
    dispatch(singleProduct(res.data))
  } catch (err) {
    console.error(err)
  }
}

//reducer
export default function(state = defaultProducts, action) {
  switch (action.type) {
    case SINGLE_PRODUCT:
      return action.product
    default:
      return state
  }
}
