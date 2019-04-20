import React from 'react'
import {connect} from 'react-redux'
import {getAdminOrders, getAdminOrderCount} from '../store'
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
class AdminOrdersView extends React.Component {
  componentDidMount() {
    const {offset, filter} = this.props.match.params
    const {getOrders} = this.props
    getOrders(offset, filter)
  }

  render() {
    const {orders, count} = this.props
    const {offset, filter} = this.props.match.params
    return (
      <div className="orders-block">
        <div className="page-subhead-container">
          <div className="page-subhead">All orders</div>
          <select
            onChange={evt => {
              const value = evt.target.value
              history.push(`/admin/orders/offset/0/filter/${value}`)
            }}
            value={filter}
          >
            <option value="all">All</option>
            <option value="created">Created</option>
            <option value="processing">Processing</option>
            <option value="cancelled">Cancelled</option>
            <option value="completed">Completed</option>
          </select>
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
          url={`/admin/orders/offset/:offset/filter/${filter}`}
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
    orders: state.adminOrders.orders,
    count: state.adminOrders.count
  }
}

const mapDispatch = dispatch => {
  return {
    getOrders: (offset, filter) => dispatch(getAdminOrders(offset, filter))
  }
}

export default connect(mapState, mapDispatch)(AdminOrdersView)
