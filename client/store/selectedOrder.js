import axios from 'axios'
import history from '../history'
import incrementCartLength from './'

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

export const updateStatusThunk = (orderId, status) => async dispatch => {
  try {
    await axios.put(`/api/orders/${orderId}/status`, {status: status})
    const res = await axios.get(`/api/orders/${orderId}`)
    let data = res.data
    dispatch(setOrder(data))
  } catch (err) {
    console.log(err)
  }
}

export const getCartThunk = () => async dispatch => {
  try {
    const res = await axios.get(`/api/cart`)
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

export const removeCartItemThunk = (orderId, productId) => async dispatch => {
  try {
    // do the delete
    await axios.delete(`/api/orders/${orderId}/remove/${productId}`)

    // get an updated cart
    const res = await axios.get(`/api/cart`)
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

export const addToCart = (productId, quantity) => async dispatch => {
  try {
    const res = await axios.get(`/api/cart`)
    const cartId = res.data
    if (cartId) {
      await axios.post(`/api/orders/${cartId}/add/${productId}`, {
        quantity: quantity,
        purchasePrice: null
      })
      history.push(`/cart`)
    } else {
      let newCart = await axios.post(`/api/orders/createCartOrder`, {})
      let newCartId = newCart.data.id
      await axios.post(`/api/orders/${newCartId}/add/${productId}`, {
        quantity: quantity,
        purchasePrice: null
      })
      history.push(`/cart`)
    }
  } catch (err) {
    console.log(err)
  }
}

export const updateCartItemThunk = (
  orderId,
  productId,
  quantity
) => async dispatch => {
  try {
    // do the delete
    await axios.put(`/api/orders/${orderId}/update/${productId}`, {
      quantity: quantity
    })

    // get an updated cart
    const res = await axios.get(`/api/cart`)
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

export const purchaseThunk = (orderId, token, addressParams) => 
  async dispatch => {
    try {
      await axios.post(`/api/orders/${orderId}/address`, addressParams)
      await axios.put(`/api/orders/${orderId}`, token)
      const res = await axios.get(`/api/orders/${orderId}`)
      let data = res.data
      dispatch(setOrder(data))
      
      
    }
    catch (err) {
      console.log(err) 
  }
}

// export const confirmThunk = (orderid, addressParams) => async dispatch => {
//   try {
//     await axios.post(`/api/orders/${orderId}/address`, addressParams)
//     const res = await axios.get(`/api/orders/${orderId}`)
//     let data = res.data
//     dispatch(setOrder(data))
//   }
//   catch (err) {
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
