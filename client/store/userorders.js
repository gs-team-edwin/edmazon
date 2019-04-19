import axios from 'axios'
import history from '../history'

// ACTION TYPES
const SET_USER_ORDERS = 'SET_USER_ORDERS'
const SET_USER_ORDERS_COUNT = 'SET_USER_ORDERS_COUNT'

//ACTION CREATORS
const setUserOrders = orders => ({type: SET_USER_ORDERS, orders})
const setUserOrdersCount = count => ({type: SET_USER_ORDERS_COUNT, count})

//THUNK CREATORS
export const getUserOrders = (userId, offset) => async dispatch => {
  try {
    const url = `/api/user/${userId}/orders/offset/${offset}`
    const res = await axios.get(url)
    dispatch(setUserOrders(res.data))
  } catch (err) {
    console.error(err)
  }
}

export const getUserOrderCount = userId => async dispatch => {
  try {
    const url = `/api/user/${userId}/orders/count`
    const res = await axios.get(url)
    dispatch(setUserOrdersCount(res.data))
  } catch (err) {
    console.log(err)
  }
}

//reducer
export default function(state = {count: 0, orders: []}, action) {
  switch (action.type) {
    case SET_USER_ORDERS:
      return {...state, orders: action.orders}
    case SET_USER_ORDERS_COUNT:
      return {...state, count: action.count}
    default:
      return state
  }
}
