import React, {Component} from 'react'
import history from '../history'
import {connect} from 'react-redux'
import { setPopup } from '../store';
import AddProduct from './AddProduct'

class AdminMenu extends Component {
  render() {
    return (
      <div>
        <div className="admin-item">ADMIN MENU</div>
        <div className="admin-button-box">
          <button
            type="button"
            className="admin-button"
            onClick={() => this.props.openAddPopup()}
          >
            Add Product
          </button>
          {this.props.popup === 'addProduct' && <AddProduct />}
          <button
            type="button"
            className="admin-button"
            onClick={() => history.push('/admin/orders/offset/0/filter/all')}
          >
            Manage Orders
          </button>
          <button
            type="button"
            className="admin-button"
            onClick={() => history.push('/admin/users/offset/0')}
          >
            Manage Users
          </button>
        </div>
      </div>
    )
  }
}

const mapDispatch = dispatch => {
  return {
    openAddPopup: () => dispatch(setPopup('addProduct'))
  }
}

const mapState = state => {
  return {
    popup: state.popup
  }
}

export default connect(mapState, mapDispatch)(AdminMenu)
