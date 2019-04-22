import React from 'react'
import {connect} from 'react-redux'
import {getCartThunk} from '../store'
import history from '../history'

class CartButton extends React.Component {
  componentDidMount() {
    this.props.getCartThunk()
  }

  componentDidUpdate(prevProps) {
    // if we just logged in...
    if (prevProps.user !== this.props.user) {
      this.props.getCartThunk()
    }
  }

  render() {
    console.log('selectedOrder', this.props.selectedOrder)
    let cartLength = 0
    if (this.props.products) {
      cartLength = this.props.products.length
    }
    return (
      <button
        type="button"
        className="cart-button"
        onClick={() => history.push('/cart')}
      >
        Cart ({cartLength})
      </button>
    )
  }
}

const mapStateToProps = state => {
  return {
    products: state.selectedOrder.order.products,
    user: state.user
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getCartThunk: userId => dispatch(getCartThunk(userId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CartButton)
