import React from 'react'
import {Link} from 'react-router-dom'

const orderItem = props => {
  return (
    <div className="cart-product">
      <Link to={`/product/${props.product.id}`}>{props.product.title}</Link>
      <div> ${props.product.price}</div>
      <button
        className="remove-item-button"
        type="button"
        onClick={() => props.removeItem(props.product.id)}
      >
        Remove from cart
      </button>
    </div>
  )
}

export default orderItem
