import React from 'react'
import history from '../history'
import {connect} from 'react-redux'
import {
  removeCartItemThunk,
  updateCartItemThunk,
  decrementCartLength
} from '../store'

class orderItem extends React.Component {
  render() {
    const {
      product,
      removeCartItem,
      status,
      orderId,
      updateCartItem,
      decrementCart
    } = this.props
    const {id, title, price, ordersProducts} = product
    const {quantity} = ordersProducts
    const itemSubtotal = (quantity * price / 100).toFixed(2)
    return (
      <div className="order-product">
        <div className="order-product-left">
          {product.photos && (
            <img
              className="order-product-image"
              src={product.photos[0].photoUrl}
            />
          )}
        </div>
        <div className="order-product-center">
          <div
            className="order-inner-product-title"
            onClick={() => history.push(`/product/${id}`)}
          >
            {title}
          </div>
          {status === 'cart' && (
            <div className="order-cart-buttons">
              <div className="order-qty-change-container">
                <span className="order-product-change-qty-label">
                  Change Quantity:
                </span>
                <select
                  onChange={evt => {
                    evt.preventDefault()
                    updateCartItem(orderId, id, evt.target.value)
                  }}
                  value={quantity}
                  className="order-product-qty-selector"
                  name="qty"
                >
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                </select>
              </div>
              <button
                className="remove-item-button"
                type="button"
                onClick={() => {
                  removeCartItem(orderId, id)
                  decrementCart()
                }}
              >
                Remove from cart
              </button>
            </div>
          )}
        </div>
        <div className="order-product-right">
          <div className="order-product-math">
            <div>${(price / 100).toFixed(2)}</div>
            <div>x {quantity}</div>
            <hr className="math-hr" />
            <div>${itemSubtotal}</div>
          </div>
        </div>
      </div>
    )
  }
}

const mapState = state => ({})
const mapDispatch = dispatch => ({
  removeCartItem: (orderId, productId) =>
    dispatch(removeCartItemThunk(orderId, productId)),
  updateCartItem: (orderId, productId, quantity) =>
    dispatch(updateCartItemThunk(orderId, productId, quantity)),
  decrementCart: () => dispatch(decrementCartLength())
})
export default connect(null, mapDispatch)(orderItem)
