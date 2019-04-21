import axios from 'axios'
import history from '../history'

// ACTION TYPES
const SET_PRODUCTS = 'SET_PRODUCTS'

//ACTION CREATORS
const setProducts = (products, count, found) => ({
  type: SET_PRODUCTS,
  products,
  count,
  found
})

//THUNK CREATORS
export const getAllProducts = offset => async dispatch => {
  try {
    const res = await axios.get(`/api/products/offset/${offset}`)
    const {products, count} = res.data
    dispatch(setProducts(products, count, false))
  } catch (err) {
    console.error(err)
  }
}

export const getProductBySearch = (term, offset) => async dispatch => {
  try {
    const res = await axios.get(`/api/products/search/${term}/offset/${offset}`)
    const {products, count, found} = res.data
    dispatch(setProducts(products, count, found))
  } catch (err) {
    console.error(err)
  }
}

export const getProductByCategory = (categoryId, offset) => async dispatch => {
  try {
    const res = await axios.get(
      `/api/products/categories/${categoryId}/offset/${offset}`
    )
    const {products, count, found} = res.data
    dispatch(setProducts(products, count, found))
  } catch (err) {
    console.error(err)
  }
}

//reducer
export default function(
  state = {count: 0, products: [], found: false},
  action
) {
  switch (action.type) {
    case SET_PRODUCTS:
      return {
        products: action.products,
        count: action.count,
        found: action.found
      }
    default:
      return state
  }
}
