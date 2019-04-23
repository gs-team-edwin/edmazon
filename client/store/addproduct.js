import axios from 'axios'

// ACTION TYPES
const ADD_PRODUCT = 'ADD_PRODUCT'

//ACTION CREATORS
const addProduct = productId => ({type: ADD_PRODUCT, productId})

//THUNK CREATORS
export const addProductThunkCreator = (productInfo) => async dispatch => {
  try {
    
    const newProduct = await axios.post('/api/products/admin/add', productInfo)
    const newProductId = newProduct.data.id
    dispatch(addProduct(newProductId))

  } catch (err) {
    console.log(err)
  }
}


export default function(state = null, action) {
  switch (action.type) {
    case ADD_PRODUCT:
      return action.productId
    default:
      return state
  }
}
