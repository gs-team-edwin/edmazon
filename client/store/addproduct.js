import axios from 'axios'

// ACTION TYPES
const ADD_PRODUCT = 'ADD_PRODUCT'

//ACTION CREATORS
const addProduct = product => ({type: ADD_PRODUCT, product})

//THUNK CREATORS
export const addProductThunkCreator = (productInfo) => async dispatch => {
  try {
    await axios.post('/api/products/admin/add', productInfo)
  } catch (err) {
    console.log(err)
  }
}
