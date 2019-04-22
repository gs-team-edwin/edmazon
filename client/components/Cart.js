import React, {Component} from 'react'
import {getCartProductsThunk, removeCartItemThunk} from '../store/cartproducts'
import {connect} from 'react-redux'
import OrderView from './OrderView'

export class Cart extends Component {
  componentDidMount() {
    if (this.props.user.id) {
      let userId = this.props.user.id
      this.props.getCartProducts(userId)
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.user.id !== this.props.user.id && this.props.user.id) {
      let userId = this.props.user.id
      this.props.getCartProducts(userId)
    }
  }

  render() {
    if (this.props.user.id) {
      return (
        <OrderView
          products={this.props.cartProducts}
          user={this.props.user}
          viewType="Cart"
          removeItem={this.props.removeCartItem}
        />
      )
    } else {
      return 'Please sign in'
    }
  }
}

const mapDispatch = dispatch => {
  return {
    getCartProducts: userId => dispatch(getCartProductsThunk(userId)),
    removeCartItem: productId => dispatch(removeCartItemThunk(productId))
  }
}

const mapState = state => {
  return {
    user: state.user,
    cartProducts: state.cartProducts
  }
}

export default connect(mapState, mapDispatch)(Cart)
