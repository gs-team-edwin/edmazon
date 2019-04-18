import axios from 'axios'
import history from '../history'

// ACTION TYPES
const SET_USER_ORDERS = 'SET_USER_ORDERS'

//ACTION CREATORS
const setUserOrders = orders => ({type: SET_USER_ORDERS, orders})

//THUNK CREATORS
export const getUserOrders = (userId, offset) => async dispatch => {
  try {
    const url = `/api/user/${userId}/orders/page/${offset}`
    const res = await axios.get(url)
    dispatch(setUserOrders(res.data))
    history.push(`/user/${userId}/orders/page/${offset}`)
  } catch (err) {
    console.error(err)
  }
}

//reducer
export default function(state = [], action) {
  switch (action.type) {
    case SET_USER_ORDERS:
      return action.orders
    default:
      return state
  }
}
