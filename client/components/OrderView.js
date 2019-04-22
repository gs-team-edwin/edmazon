import OrderItem from './OrderItem'
import React from 'react'

//takes 4 props: state user object, viewType (just a string e.g. 'cart', 'order history'), products array, and removeItem function to be passed down to the OrderItem view
const orderView = props => {
  const subtotal = (
    props.products.reduce((total, product) => total + product.price, 0) / 100
  ).toFixed(2)
  return (
    <div className="order-view-container">
      <div className="order-view">
        <div className="order-view-header-container">
          <div className="order-view-header">
            {props.user.email}'s {props.viewType}
          </div>
        </div>
        <div className="order-body">
          <div className="order-body-left">
            {props.products.length ? (
              props.products.map(product => (
                <div key={product.id}>
                  <OrderItem product={product} removeItem={props.removeItem} />
                </div>
              ))
            ) : (
              <div className="">No products to show</div>
            )}
          </div>
          <div className="order-body-right">
            <div className="order-body-info-block">
              <div>SUBTOTAL: ${parseFloat(subtotal).toFixed(2)}</div>
              <div>TAX: ${parseFloat(subtotal * 0.1).toFixed(2)}</div>
              <div>TOTAL: ${parseFloat(subtotal * 1.1).toFixed(2)}</div>
              <div>YOU SAVED: ${parseFloat(subtotal / 4).toFixed(2)}</div>
            </div>
            <div className="order-body-info-block">
              <div className="">Shipping Address</div>
              <div className="">Payment Information</div>
            </div>
            <div className="order-body-info-block">
              <button type="button" className="checkout-button">
                CHECK OUT
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default orderView
