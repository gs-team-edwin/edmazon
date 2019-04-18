import React from 'react'
import {connect} from 'react-redux'
import {getUserOrders, getUserOrderCount} from '../store'
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
    const {getOrders, getCount} = this.props
    const {userId, offset} = this.props.match.params
    getOrders(userId, offset)
    getCount(userId)
  }

  render() {
    const {orders, user, count} = this.props
    const {userId, offset} = this.props.match.params
    return (
      <div>
        <div className="page-subhead">
          <h2>{user.email}'s orders:</h2>
        </div>
        <div className="orders-block">
          {orders.map(order => <SingleOrderRow order={order} key={order.id} />)}
        </div>
        {count > offset * 20 && (
          <div className="page-button">
            <button
              type="button"
              onClick={() => {
                history.push(
                  `/user/${userId}/orders/page/${Number(offset) + 1}`
                )
              }}
            >
              NEXT
            </button>
          </div>
        )}
        {offset > 0 && (
          <div className="page-button">
            <button
              type="button"
              onClick={() => {
                history.push(
                  `/user/${userId}/orders/page/${Number(offset) - 1}`
                )
              }}
            >
              PREV
            </button>
          </div>
        )}
      </div>
    )
  }
}

const mapState = state => {
  return {
    orders: state.userOrders.orders,
    user: state.user,
    count: state.userOrders.count
  }
}

const mapDispatch = dispatch => {
  return {
    getOrders: (userId, offset) => {
      dispatch(getUserOrders(userId, offset))
    },
    getCount: userId => {
      dispatch(getUserOrderCount(userId))
    }
  }
}

export default connect(mapState, mapDispatch)(OrderHistory)
