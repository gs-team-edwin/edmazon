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
export const getAllProducts = (offset = 0) => async dispatch => {
  try {
    // let arr = []
    // for (let i = 1 + offset; i < 10 + offset; i++) {
    //   const res = await axios.get(`/auth/products/${i}`)
    //   arr.push(res.data)
    // }
    // dispatch(getProduct(arr))
    const res = await axios.get('/api/products')
    dispatch(getProduct(res.data))
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
