import axios from 'axios'
import history from '../history'

// ACTION TYPES
const SET_USER_ORDERS = 'SET_USER_ORDERS'

//ACTION CREATORS
const setUserOrders = (orders, count) => ({
  type: SET_USER_ORDERS,
  orders,
  count
})

//THUNK CREATORS
export const getUserOrders = (userId, offset) => async dispatch => {
  try {
    const url = `/api/user/${userId}/orders/offset/${offset}`
    const res = await axios.get(url)
    dispatch(setUserOrders(res.data.orders, res.data.count))
  } catch (err) {
    console.error(err)
  }
}

//reducer
export default function(state = {count: 0, orders: []}, action) {
  switch (action.type) {
    case SET_USER_ORDERS:
      return {count: action.count, orders: action.orders}
    default:
      return state
  }
}
