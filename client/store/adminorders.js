import axios from 'axios'
import history from '../history'

// ACTION TYPES
const SET_ADMIN_ORDERS = 'SET_ADMIN_ORDERS'

//ACTION CREATORS
const setAdminOrders = (orders, count) => ({
  type: SET_ADMIN_ORDERS,
  orders,
  count
})

//THUNK CREATORS
export const getAdminOrders = (offset, filter) => async dispatch => {
  try {
    const url = `/api/admin/orders/offset/${offset}/filter/${filter}`
    const res = await axios.get(url)
    dispatch(setAdminOrders(res.data.orders, res.data.count))
  } catch (err) {
    console.error(err)
  }
}

//reducer
export default function(state = {count: 0, orders: []}, action) {
  switch (action.type) {
    case SET_ADMIN_ORDERS:
      return {count: action.count, orders: action.orders}
    default:
      return state
  }
}
