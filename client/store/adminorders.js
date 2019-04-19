import axios from 'axios'
import history from '../history'

// ACTION TYPES
const SET_ADMIN_ORDERS = 'SET_ADMIN_ORDERS'
const SET_ADMIN_ORDERS_COUNT = 'SET_ADMIN_ORDERS_COUNT'

//ACTION CREATORS
const setAdminOrders = orders => ({type: SET_ADMIN_ORDERS, orders})
const setAdminOrdersCount = count => ({type: SET_ADMIN_ORDERS_COUNT, count})

//THUNK CREATORS
export const getAdminOrders = offset => async dispatch => {
  try {
    const url = `/api/admin/orders/offset/${offset}`
    const res = await axios.get(url)
    dispatch(setAdminOrders(res.data))
  } catch (err) {
    console.error(err)
  }
}

export const getAdminOrderCount = userId => async dispatch => {
  try {
    const url = `/api/admin/orders/count`
    const res = await axios.get(url)
    dispatch(setAdminOrdersCount(res.data))
  } catch (err) {
    console.log(err)
  }
}

//reducer
export default function(state = {count: 0, orders: []}, action) {
  switch (action.type) {
    case SET_ADMIN_ORDERS:
      return {...state, orders: action.orders}
    case SET_ADMIN_ORDERS_COUNT:
      return {...state, count: action.count}
    default:
      return state
  }
}
