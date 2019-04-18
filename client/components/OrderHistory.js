import React from 'react'
import {connect} from 'react-redux'
import {getUserOrders, me} from '../store'

const SingleOrderRow = ({order}) => {
  return (
    <div className="order-row">
      <span>Order #{order.id}</span>{' '}
      <span>Checkout Date: {order.checkoutDate}</span>{' '}
      <span>Status: {order.status}</span>
    </div>
  )
}
//     history.push(`/user/${userId}/orders/page/${offset}`)
class OrderHistory extends React.Component {
  componentDidMount() {
    const {getOrders, user} = this.props
    if (user.id) {
      getOrders(user.id, 0)
    }
  }

  componentDidUpdate(prevProps) {
    console.log('FIRING COMPONENT DID UPDATE')
    if (prevProps.user.id !== this.props.user.id) {
      const {getOrders, user} = this.props
      getOrders(user.id, 0)
    }
  }
  render() {
    const {orders, user} = this.props
    return (
      <div>
        <div className="page-subhead">
          <h2>{user.email}'s orders:</h2>
        </div>
        <div className="orders-block">
          {orders.map(order => <SingleOrderRow order={order} key={order.id} />)}
        </div>
      </div>
    )
  }
}

const mapState = state => {
  return {
    orders: state.userOrders,
    user: state.user
  }
}

const mapDispatch = dispatch => {
  return {
    getOrders: (userId, offset) => {
      dispatch(getUserOrders(userId, offset))
    },
    getUser: () => dispatch(me())
  }
}

export default connect(mapState, mapDispatch)(OrderHistory)
