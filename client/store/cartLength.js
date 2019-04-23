import axios from 'axios'
import history from '../history'

// ACTION TYPES
const SET_CART_LENGTH = 'SET_CART_LENGTH'
const INCREMENT_LENGTH = 'INCREMENT_LENGTH'
const DECREMENT_LENGTH = 'DECREMENT_LENGTH'

//ACTION CREATORS
const setCartLength = length => ({
  type: SET_CART_LENGTH,
  length
})
export const incrementCartLength = () => ({
  type: INCREMENT_LENGTH
})
export const decrementCartLength = () => ({
  type: DECREMENT_LENGTH
})

//THUNK CREATORS
export const getCartLengthThunk = () => async dispatch => {
  try {
    const url = `/api/cart/length`
    const res = await axios.get(url)
    dispatch(setCartLength(res.data))
  } catch (err) {
    console.error(err)
  }
}

//reducer
export default function(state = 0, action) {
  switch (action.type) {
    case SET_CART_LENGTH:
      return action.length
    case INCREMENT_LENGTH:
      return state + 1
    case DECREMENT_LENGTH:
      return state - 1
    default:
      return state
  }
}
