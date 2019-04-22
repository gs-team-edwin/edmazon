import OrderItem from './OrderItem'
import React from 'react'
import {connect} from 'react-redux'

//takes 4 props: state user object, viewType (just a string e.g. 'cart', 'order history'), products array, and removeItem function to be passed down to the OrderItem view
class orderView extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      status: 'created'
    }
  }

  render() {
    const subtotal = (
      this.props.products.reduce(
        (total, product) =>
          total + product.price * product.ordersProducts.quantity,
        0
      ) / 100
    ).toFixed(2)
    const {user, viewType, products, removeItem} = this.props
    return (
      <div className="order-view-container">
        <div className="order-view">
          <div className="order-view-header-container">
            <div className="order-view-header">
              {user.email}'s {viewType}
            </div>
          </div>
          <div className="order-body">
            <div className="order-body-left">
              {products.length ? (
                products.map(product => (
                  <div key={product.id}>
                    <OrderItem
                      product={product}
                      removeItem={removeItem}
                      viewType={viewType}
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
              {viewType === 'order' && (
                <div className="order-body-info-block">
                  <div className="">Shipping Address</div>
                  <div className="">Payment Information</div>
                </div>
              )}
              {viewType === 'order' &&
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
              {viewType === 'cart' && (
                <div className="order-body-info-block">
                  <button type="button" className="checkout-button">
                    CHECK OUT
                  </button>
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
