import axios from 'axios'

const SET_SELECTED_ORDER = 'SET_SELECTED_ORDER'

const setOrder = order => ({type: SET_SELECTED_ORDER, order})

export const getOrderThunk = orderId => async dispatch => {
  try {
    const res = await axios.get(`/api/orders/${orderId}`)
    let data = res.data
    dispatch(setOrder(data))
  } catch (err) {
    console.log(err)
  }
}

export const getCartThunk = userId => async dispatch => {
  try {
    const res = await axios.get(`api/cart/${userId}`)
    const cartId = res.data
    if (cartId) {
      const res2 = await axios.get(`/api/orders/${cartId}`)
      let data = res2.data
      dispatch(setOrder(data))
    }
  } catch (err) {
    console.log(err)
  }
}

// export const removeCartItemThunk = productId => async dispatch => {
//   try {
//     await axios.delete(`/api/cart/remove/${productId}`)
//     dispatch(removeCartItem(productId))
//   } catch (err) {
//     console.log(err)
//   }
// }

export default function(
  state = {order: {products: [], status: ''}, user: {}},
  action
) {
  switch (action.type) {
    case SET_SELECTED_ORDER:
      return {
        order: action.order.order,
        user: action.order.user
      }
    default:
      return state
  }
}
