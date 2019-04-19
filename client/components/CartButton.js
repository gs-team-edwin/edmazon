import React from 'react'
import {connect} from 'react-redux'
import {} from '../store'
import history from '../history'

class CartButton extends React.Component {
  render() {
    return (
      <div className="cart-button">
        Cart
        <div className="cart-button-count" />
      </div>
    )
  }
}

mapStateToProps = state => {
  return {}
}

mapDispatchToProps = dispatch => {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(CartButton)
