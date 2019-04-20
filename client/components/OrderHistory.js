import React from 'react'
import {connect} from 'react-redux'
import {getUserOrders, getUserOrderCount} from '../store'
import history from '../history'
import {PaginationButtons} from './'

const SingleOrderRow = ({order}) => {
  const date = new Date(order.checkoutDate)
  const dateString = `${date.getMonth() +
    1}/${date.getDate()}/${date.getFullYear()}`
  return (
    <div className="order-row">
      <span className="order-row-item">{order.id}</span>
      <span className="order-row-item">{dateString}</span>
      <span className="order-row-item">{order.status}</span>
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
      <div className="orders-block">
        <div className="page-subhead-container">
          <div className="page-subhead">{user.email}'s orders:</div>
        </div>

        <div className="order-table">
          <div className="order-row header">
            <span className="order-row-item">Order Number</span>
            <span className="order-row-item">Checkout Date</span>
            <span className="order-row-item">Status</span>
          </div>
          {orders.map(order => <SingleOrderRow order={order} key={order.id} />)}
        </div>
        <PaginationButtons
          url={`/user/${userId}/orders/offset/:offset`}
          offset={Number(offset)}
          pageSize={20}
          count={count}
        />
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
