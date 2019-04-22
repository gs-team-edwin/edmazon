import React, {Component} from 'react'
import {getCartThunk, removeCartItemThunk} from '../store'
import {connect} from 'react-redux'
import OrderView from './OrderView'

export class Cart extends Component {
  componentDidMount() {
    if (this.props.user.id) {
      let userId = this.props.user.id
      this.props.getCartThunk(userId)
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.user.id !== this.props.user.id && this.props.user.id) {
      let userId = this.props.user.id
      this.props.getCartThunk(userId)
    }
  }

  render() {
    if (this.props.user.id) {
      return (
        <OrderView
          order={this.props.selectedOrder.order}
          user={this.props.selectedOrder.user}
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
    // getCartProducts: userId => dispatch(getCartProductsThunk(userId)),
    removeCartItem: productId => dispatch(removeCartItemThunk(productId)),
    getCartThunk: userId => dispatch(getCartThunk(userId))
  }
}

const mapState = state => {
  return {
    user: state.user,
    selectedOrder: state.selectedOrder
  }
}

export default connect(mapState, mapDispatch)(Cart)
