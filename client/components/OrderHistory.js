import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {} from '../store'
import history from '../history'

class OrderHistory extends React.Component {
  render() {
    return <div>My Orders!</div>
  }
}

const mapState = state => {
  return {}
}

const mapDispatch = state => {
  return {}
}

export default connect(mapState, mapDispatch)(OrderHistory)
