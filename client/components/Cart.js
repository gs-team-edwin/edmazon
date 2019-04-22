import React, {Component} from 'react'
import {getCartThunk} from '../store'
import {connect} from 'react-redux'
import OrderView from './OrderView'

export class Cart extends Component {
  componentDidMount() {
    this.props.getCartThunk()
  }

  // componentDidUpdate(prevProps) {
  //   if (prevProps.user.id !== this.props.user.id && this.props.user.id) {
  //   this.props.getCartThunk()
  //   }
  // }

  render() {
    if (this.props.user.id) {
      return (
        <OrderView
          order={this.props.selectedOrder.order}
          user={this.props.selectedOrder.user}
        />
      )
    } else {
      return 'Please sign in'
    }
  }
}

const mapDispatch = dispatch => {
  return {
    getCartThunk: () => dispatch(getCartThunk())
  }
}

const mapState = state => {
  return {
    user: state.user,
    selectedOrder: state.selectedOrder
  }
}

export default connect(mapState, mapDispatch)(Cart)
