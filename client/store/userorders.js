import axios from 'axios'
import history from '../history'

// ACTION TYPES
const SET_USER_ORDERS = 'SET_USER_ORDERS'

//ACTION CREATORS
const setUserOrders = (orders, count, email) => ({
  type: SET_USER_ORDERS,
  orders,
  count,
  email
})

//THUNK CREATORS
export const getUserOrders = (userId, offset) => async dispatch => {
  try {
    const url = `/api/user/${userId}/orders/offset/${offset}`
    const res = await axios.get(url)
    dispatch(setUserOrders(res.data.orders, res.data.count, res.data.email))
  } catch (err) {
    console.error(err)
  }
}

//reducer
export default function(state = {count: 0, orders: [], email: ''}, action) {
  switch (action.type) {
    case SET_USER_ORDERS:
      return {count: action.count, orders: action.orders, email: action.email}
    default:
      return state
  }
}
