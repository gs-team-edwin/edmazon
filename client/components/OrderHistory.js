import React from 'react'
import {connect} from 'react-redux'
import {getUserOrders, getUserOrderCount} from '../store'
import history from '../history'

const SingleOrderRow = ({order}) => {
  const date = new Date(order.checkoutDate)
  console.log('date: ', date)
  const dateString = `${date.getMonth() +
    1}/${date.getDate()}/${date.getFullYear()}`
  return (
    <tr className="order-row">
      <td>{order.id}</td>
      <td>{dateString}</td>
      <td>{order.status}</td>
    </tr>
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
        <div className="page-subhead">
          <h2>{user.email}'s orders:</h2>
        </div>

        <table className="order-table">
          <tbody>
            <tr>
              <th>Order Number</th>
              <th>Checkout Date</th>
              <th>Status</th>
            </tr>
            {orders.map(order => (
              <SingleOrderRow order={order} key={order.id} />
            ))}
          </tbody>
        </table>

        <div className="pagination-container">
          {offset > 0 && (
            <button
              className="pagination-button prev"
              type="button"
              onClick={() => {
                history.push(
                  `/user/${userId}/orders/page/${Number(offset) - 20}`
                )
              }}
            >
              PREV
            </button>
          )}
          {count > offset && (
            <button
              className="pagination-button next"
              type="button"
              onClick={() => {
                history.push(
                  `/user/${userId}/orders/page/${Number(offset) + 20}`
                )
              }}
            >
              NEXT
            </button>
          )}
        </div>
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
