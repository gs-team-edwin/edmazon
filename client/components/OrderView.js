import OrderItem from './OrderItem'
import React from 'react'

//takes 3 props: user object, viewType (e.g. 'cart', 'order history'), and products array 
const orderView = props => {
  const subtotal = props.products.reduce(
    (total, amount) => total + amount.price,
    0
  )
  return (
    <div className="cart-page-width">
      <div>
      <div className = "cart-email">{props.user.email}'s {props.viewType}</div>
        <div>
          {props.products.length ? (
            props.products.map(product => (
              <div key={product.id}>
                <OrderItem
                  product={product} removeItem = {props.removeItem}
                />
              </div>
            ))
          ) : (
            <div className="cart-products">No products to show</div>
          )}
        </div>
      </div>
      <div>
        <div className="cart-box">
          SUBTOTAL: ${parseFloat(subtotal).toFixed(2)}
          TAX: ${parseFloat(subtotal * 0.1).toFixed(2)}
          TOTAL: ${parseFloat(subtotal * 1.1).toFixed(2)}
          YOU SAVED: ${parseFloat(subtotal / 4).toFixed(2)}
        </div>
        <div className="cart-box">Shipping Address</div>
        <div className="cart-box">Payment Information</div>
        <div>
            <div className="cart-box">
            Cart Review
            {props.products.map((product, index) => (
                <div key={product.id}>
                <div>
                    Item {index + 1}: {`$${product.price}`}
                </div>
                </div>
            ))}
            </div>
        </div>
      </div>
    </div>
  )
}

export default orderView
