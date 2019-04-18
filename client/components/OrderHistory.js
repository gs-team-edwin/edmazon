import React from 'react'
import {connect} from 'react-redux'
import {getUserOrders, me} from '../store'
import history from '../history'

const SingleOrderRow = ({order}) => {
  return (
    <div className="order-row">
      <span>Order #{order.id}</span>{' '}
      <span>Checkout Date: {order.checkoutDate}</span>{' '}
      <span>Status: {order.status}</span>
    </div>
  )
}
class OrderHistory extends React.Component {
  componentDidMount() {
    const {getOrders} = this.props
    const {userId, offset} = this.props.match.params
    getOrders(userId, offset)
  }

  render() {
    const {orders, user} = this.props
    const {userId, offset} = this.props.match.params
    return (
      <div>
        <div className="page-subhead">
          <h2>{user.email}'s orders:</h2>
        </div>
        <div className="orders-block">
          {orders.map(order => <SingleOrderRow order={order} key={order.id} />)}
        </div>
        <div className="page-button">
          <button
            type="button"
            onClick={() => {
              history.push(`/user/${userId}/orders/page/${Number(offset) + 1}`)
            }}
          >
            NEXT
          </button>
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
