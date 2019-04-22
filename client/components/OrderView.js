import OrderItem from './OrderItem'
import React from 'react'
import StripeCheckout from 'react-stripe-checkout';
import {connect} from 'react-redux'
import axios from 'axios'

//takes 4 props: state user object, viewType (just a string e.g. 'cart', 'order history'), products array, and removeItem function to be passed down to the OrderItem view
class orderView extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      status: this.props.order.status
    }
  }
  onToken = (token) => {
    console.log(token)
    fetch(`/api/orders/${this.props.order.id}`, {
      method: 'POST',
      body: JSON.stringify(token),
    }).then(response => {
      response.json()
    });
  }

  render() {
    const {products, status} = this.props.order
    const {user, removeItem, userType} = this.props
    const {email} = user

    // calculate subtotal
    const subtotal = (
      products.reduce(
        (total, product) =>
          total + product.price * product.ordersProducts.quantity,
        0
      ) / 100
    ).toFixed(2)


    return (
      <div className="order-view-container">
        <div className="order-view">
          <div className="order-view-header-container">
            {status === 'cart' ? (
              <div className="order-view-header">{email}'s cart</div>
            ) : (
              <div className="order-view-header">
                Order {this.props.order.id}, user {email}
              </div>
            )}
          </div>
          <div className="order-body">
            <div className="order-body-left">
              {products.length ? (
                products.map(product => (
                  <div key={product.id}>
                    <OrderItem
                      product={product}
                      removeItem={removeItem}
                      status={status}
                    />
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
              {status !== 'cart' && (
                <div className="order-body-info-block">
                  <div className="">Shipping Address</div>
                  <div className="">Payment Information</div>
                </div>
              )}
              {status !== 'cart' &&
                userType === 'admin' && (
                  <div className="order-body-info-block">
                    <form>
                      <select
                        onChange={evt =>
                          this.setState({status: evt.target.value})
                        }
                        value={this.state.status}
                        className="order-status-selector"
                        name="qty"
                      >
                        <option value="created">Created</option>
                        <option value="processing">Processing</option>
                        <option value="cancelled">Cancelled</option>
                        <option value="completed">Completed</option>
                      </select>
                      <button
                        type="submit"
                        onClick={evt => {
                          evt.preventDefault()
                          console.log(`changing status to ${this.state.status}`)
                        }}
                        className="order-product-change-qty-button"
                      >
                        Change Status
                      </button>
                    </form>
                  </div>
                )}
              {status === 'cart' && (
                <div className="order-body-info-block">
                  <StripeCheckout
        token={this.onToken}
        stripeKey="pk_test_HooeFoS7quAixEoIaZpFxvas00lGh0PGd8"
        amount={Number(parseFloat(subtotal * 1.1 * 100).toFixed(2))}
      />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapState = state => ({
  userType: state.user.userType
})
const mapDispatch = dispatch => ({})
export default connect(mapState, mapDispatch)(orderView)
