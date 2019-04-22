import React from 'react'
import history from '../history'
import {connect} from 'react-redux'

class orderItem extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      quantity: 1
    }
  }

  render() {
    const {product, removeItem, viewType} = this.props
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
          {viewType === 'cart' && (
            <div className="order-cart-buttons">
              <button
                className="remove-item-button"
                type="button"
                onClick={() => removeItem(id)}
              >
                Remove from cart
              </button>
              <form>
                <select
                  onChange={evt => this.setState({quantity: evt.target.value})}
                  value={this.state.quantity}
                  className="order-product-qty-selector"
                  name="qty"
                >
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">4</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                </select>
                <button
                  type="submit"
                  onClick={evt => {
                    evt.preventDefault()
                    console.log(`changed quantity to ${this.state.quantity}`)
                  }}
                  className="order-product-change-qty-button"
                >
                  Change Quantity
                </button>
              </form>
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
const mapDispatch = dispatch => ({})
export default connect(mapState, mapDispatch)(orderItem)