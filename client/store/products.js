import axios from 'axios'
import history from '../history'

// ACTION TYPES
const GET_ALL_PRODUCTS = 'GET_ALL_PRODUCTS'

//ACTION CREATORS
const getProducts = products => ({type: GET_ALL_PRODUCTS, products})

//THUNK CREATORS
export const getAllProducts = offset => async dispatch => {
  try {
    const res = await axios.get(`/api/products/page/${offset}`)
    dispatch(getProducts(res.data))
    history.push(`/products/page/${offset}`)
  } catch (err) {
    console.error(err)
  }
}

//reducer
export default function(state = [], action) {
  switch (action.type) {
    case GET_ALL_PRODUCTS:
      return action.products
    default:
      return state
  }
}
