// library imports
import {createStore, combineReducers, applyMiddleware} from 'redux'
import {createLogger} from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'

// store imports
import user from './user'
import popup from './popup'
import products from './products'
import selectedProduct from './selectedproduct'
import userorders from './userorders'
import cartProducts from './cartproducts'
import categories from './categories'

const reducer = combineReducers({
  user: user,
  products: products,
  popup: popup,
  userOrders: userorders,
  cartProducts: cartProducts,
  categories: categories,
  selectedProduct: selectedProduct,
})

const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
)
const store = createStore(reducer, middleware)

export default store
export * from './user'
export * from './popup'
export * from './products'
export * from './selectedproduct'
export * from './userorders'
export * from './addproduct'
