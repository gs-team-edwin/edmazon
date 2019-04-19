import React from 'react'
import {connect} from 'react-redux'
import {getAdminOrders, getAdminOrderCount} from '../store'
import history from '../history'

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
class AdminOrdersView extends React.Component {
  componentDidMount() {
    const {offset} = this.props.match.params
    const {getOrders, getCount} = this.props
    getOrders(offset)
    getCount()
  }

  render() {
    const {orders, count} = this.props
    const {offset} = this.props.match.params
    return (
      <div className="orders-block">
        <div className="page-subhead-container">
          <div className="page-subhead">All orders:</div>
        </div>

        <div className="order-table">
          <div className="order-row header">
            <span className="order-row-item">Order Number</span>
            <span className="order-row-item">Checkout Date</span>
            <span className="order-row-item">Status</span>
          </div>
          {orders.map(order => <SingleOrderRow order={order} key={order.id} />)}
        </div>

        <div className="pagination-container">
          {offset > 0 && (
            <button
              className="pagination-button prev"
              type="button"
              onClick={() => {
                history.push(`/admin/orders/offset/${Number(offset) - 20}`)
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
                history.push(`/admin/orders/offset/${Number(offset) + 20}`)
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
    orders: state.adminOrders.orders,
    count: state.adminOrders.count
  }
}

const mapDispatch = dispatch => {
  return {
    getOrders: offset => dispatch(getAdminOrders(offset)),
    getCount: () => dispatch(getAdminOrderCount())
  }
}

export default connect(mapState, mapDispatch)(AdminOrdersView)
