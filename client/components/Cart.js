import React, {Component} from 'react'
import getCartProductsThunk from '../store/products'
import {connect} from 'react-redux'

export class Cart extends Component {
  render() {
    return (
      <div className = "cart-page-width">
        <div>
            <div className = "cart-products">
              Shipment {this.props.getCartProducts(1)}
              <div></div>
            </div>
            <div className = "cart-box">Shipping Address</div>
            <div className = "cart-box">Payment Information</div>
            <div className = "cart-box">Cart Review</div>
        </div>
        <div>
            <div className = "cart-total">Cart Total</div>
        </div>
      </div>
    )
  }
}

const mapDispatch = dispatch => {
  return {
    getCartProducts: userId => dispatch(getCartProductsThunk(userId))
  }
}

const mapState = state => {
  return {
    user: state.user
  }
}

export default connect(mapState, mapDispatch)(Cart)