import React from 'react'
import {connect} from 'react-redux'
import {} from '../store'
import history from '../history'

class CartButton extends React.Component {
  componentDidMount() {
    this.props.getCartLength()
  }

  render() {
    const {cartLength} = this.props
    return <button type = "button" className="cart-button" onClick = {() => history.push('/cart')}>Cart ({cartLength})</button>
  }
}

const mapStateToProps = state => {
  return {
    cartLength: 0
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getCartLength: () => {}
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CartButton)
