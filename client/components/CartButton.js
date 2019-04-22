import React from 'react'
import {connect} from 'react-redux'
import {getCartLengthThunk} from '../store'
import history from '../history'

class CartButton extends React.Component {
  componentDidMount() {
    this.props.getCartLength()
  }

  componentDidUpdate(prevProps) {
    // if we just logged in...
    if (prevProps.user !== this.props.user) {
      this.props.getCartLength()
    }
  }

  render() {
    const {cartLength} = this.props
    return (
      <button
        type="button"
        className="cart-button"
        onClick={() => {
          if (cartLength > 0) history.push('/cart')
        }}
      >
        Cart ({cartLength})
      </button>
    )
  }
}

const mapStateToProps = state => {
  return {
    cartLength: state.cartLength,
    user: state.user
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getCartLength: () => dispatch(getCartLengthThunk())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CartButton)
