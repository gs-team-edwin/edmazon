import React, {Component} from 'react'

export default class AdminMenu extends Component {
  render() {
    return (
      <div>
        <div className="admin-item">ADMIN MENU</div>
        <div className="admin-button-box">
            <button
            type="button"
            className="admin-button"
            onClick={() =>
                this.props.loadNewData(
                parseInt(this.props.match.params.offset, 10) - 1
                )
            }
            >
            Add Product
            </button>
            <button
            type="button"
            className="admin-button"
            onClick={() =>
                this.props.loadNewData(
                parseInt(this.props.match.params.offset, 10) - 1
                )
            }
            >
                Manage Orders
            </button>
            <button
            type="button"
            className="admin-button"
            onClick={() =>
                this.props.loadNewData(
                parseInt(this.props.match.params.offset, 10) - 1
                )
            }
            >
                Manage Users
            </button>
        </div>
      </div>
    )
  }
}
