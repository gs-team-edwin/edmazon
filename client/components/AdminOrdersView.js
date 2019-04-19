import React from 'react'
import {connect} from 'react-redux'
import {} from '../store'
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
  }

  render() {
    // const {orders, user, count} = this.props
    const {offset} = this.props.match.params
    console.log('RENDERING ADMIN ORDERS VIEW')
    return <div>TESTING</div>
  }
}

const mapState = state => {
  return {}
}

const mapDispatch = dispatch => {
  return {
    getOrders: offset => {},
    getCount: () => {}
  }
}

export default connect(mapState, mapDispatch)(AdminOrdersView)
