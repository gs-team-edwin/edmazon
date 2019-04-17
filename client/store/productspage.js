import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_PRODUCT = 'GET_PRODUCT'
//const REMOVE_PRODUCT = 'REMOVE_PRODUCT'

// INITIAL STATE
const defaultProducts = []

//ACTION CREATORS
const getProduct = product => ({type: GET_PRODUCT, product})
//const removeProduct = () => ({type: REMOVE_PRODUCT})

//THUNK CREATORS
export const getAllProducts = offset => async dispatch => {
  try {
    const res = await axios.get(`/api/productspage/${offset}`)
    dispatch(getProduct(res.data))
    history.push(`/productspage/${offset}`)
  } catch (err) {
    console.error(err)
  }
}

//reducer
export default function(state = defaultProducts, action) {
  switch (action.type) {
    case GET_PRODUCT:
      return action.product
    default:
      return state
  }
}
