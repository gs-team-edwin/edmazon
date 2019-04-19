import axios from 'axios'

const GET_CART_PRODUCTS = "GET_CART_PRODUCTS"

const getCartProducts = products => ({type: GET_CART_PRODUCTS, products})

export const getCartProductsThunk = userId => async dispatch => {
    try {
      const res = await axios.get(`/api/orders/cart/${userId}`)
      let data = res.data
      dispatch(getCartProducts(data))
    } catch (err) {
      console.log(err)
    }
  }

export default function(state = [], action) {
  switch (action.type) {
    case GET_CART_PRODUCTS:
      return action.products
    default:
      return state
  }
}