import React from 'react'
import {connect} from 'react-redux'
import {getUserOrders, me} from '../store'

const SingleOrderRow = ({order}) => {
  return (
    <div className="order-row">
      Order #{order.id}; status: {order.status}
    </div>
  )
}
//     history.push(`/user/${userId}/orders/page/${offset}`)
class OrderHistory extends React.Component {
  async componentDidMount() {
    const {getOrders, user} = this.props
    await getOrders(user.id, 0)
  }
  render() {
    const {orders, user} = this.props
    return (
      <div>
        <div className="page-subhead">{user.email}'s orders</div>
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
    }
  }
}

export default connect(mapState, mapDispatch)(OrderHistory)
