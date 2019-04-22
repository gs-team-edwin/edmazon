import React, {Component} from 'react'
import {getOrderThunk} from '../store'
import {connect} from 'react-redux'
import OrderView from './OrderView'

export class SingleOrderView extends Component {
  componentDidMount() {
    const {orderId} = this.props.match.params
    this.props.getOrderThunk(orderId)
  }

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
    getOrderThunk: orderId => dispatch(getOrderThunk(orderId))
  }
}

const mapState = state => {
  return {
    user: state.user,
    selectedOrder: state.selectedOrder
  }
}

export default connect(mapState, mapDispatch)(SingleOrderView)
