import React, {Component} from 'react'
import history from '../history'

export default class AdminMenu extends Component {
  render() {
    return (
      <div>
        <div className="admin-item">ADMIN MENU</div>
        <div className="admin-button-box">
          <button
            type="button"
            className="admin-button"
            onClick={() => history.push('/addproduct')}
          >
            Add Product
          </button>
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
            onClick={() => console.log('put an onclick function here')}
          >
            Manage Users
          </button>
        </div>
      </div>
    )
  }
}