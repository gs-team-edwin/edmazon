import React from 'react'
import {Link} from 'react-router-dom'

const orderItem = props => {
  const {product, removeItem, viewType} = props
  const {id, title, price} = product
  console.log(product)
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
        <Link to={`/product/${id}`}>{title}</Link>
        <div> ${price}</div>
      </div>
      <div className="order-product-right">
        {viewType && (
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
                onChange={() => console.log('changed selector')}
                value={1}
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
                onClick={() => console.log('change quantity')}
                className="order-product-change-qty-button"
              >
                Change Quantity
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  )
}

export default orderItem
