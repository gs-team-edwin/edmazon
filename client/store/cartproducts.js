import axios from 'axios'

const GET_CART_PRODUCTS = 'GET_CART_PRODUCTS'
const REMOVE_CART_ITEM = 'REMOVE_CART_ITEM'

const getCartProducts = products => ({type: GET_CART_PRODUCTS, products})
const removeCartItem = productId => ({type: REMOVE_CART_ITEM, productId})

export const getCartProductsThunk = userId => async dispatch => {
  try {
    const res = await axios.get(`/api/orders/cart/${userId}`)
    let data = res.data
    dispatch(getCartProducts(data))
  } catch (err) {
    console.log(err)
  }
}
export const removeCartItemThunk = productId => async dispatch => {
  try {
    await axios.delete(`/api/cart/remove/${productId}`)
    dispatch(removeCartItem(productId))
  } catch (err) {
    console.log(err)
  }
}

export default function(state = [], action) {
  switch (action.type) {
    case GET_CART_PRODUCTS:
      return action.products
    case REMOVE_CART_ITEM:
      return state.filter(product => product.id !== action.productId)
    default:
      return state
  }
}
