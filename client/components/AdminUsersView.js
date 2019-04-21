import React from 'react'
import {connect} from 'react-redux'
import {getAdminUsers, deleteUser} from '../store'
import history from '../history'
import {PaginationButtons} from './'

const SingleUserRow = props => {
  const {user, deleteThisUser, globalUserId} = props
  return (
    <div className="user-row">
      <span className="user-row-item large">{user.email}</span>
      <span className="user-row-item">{user.userType}</span>
      <span className="user-row-item">
        <button type="button" className="user-row-button">
          Reset Password
        </button>
      </span>
      <span className="user-row-item">
        {globalUserId === user.id ? (
          <span className="user-row-text">Current User</span>
        ) : (
          <button
            type="button"
            className="user-row-button"
            onClick={() => {
              deleteThisUser(user.id)
              history.go(0)
            }}
          >
            Delete
          </button>
        )}
      </span>
      <span className="user-row-item">
        <button type="button" className="user-row-button">
          View Orders
        </button>
      </span>
    </div>
  )
}
class AdminUsersView extends React.Component {
  componentDidMount() {
    const {offset} = this.props.match.params
    const {getUsers} = this.props
    getUsers(offset)
  }

  render() {
    const {users, count, deleteThisUser} = this.props
    const {offset} = this.props.match.params
    return (
      <div className="users-block">
        <div className="page-subhead-container">
          <div className="page-subhead">All Users</div>
        </div>

        <div className="user-table">
          <div className="user-row header">
            <span className="user-row-item large">User Email</span>
            <span className="user-row-item">User Type</span>
            <span className="user-row-item">Reset Password</span>
            <span className="user-row-item">Delete</span>
            <span className="user-row-item">View orders</span>
          </div>
          {users.map(user => (
            <SingleUserRow
              user={user}
              key={user.id}
              offset={offset}
              deleteThisUser={deleteThisUser}
              globalUserId={this.props.user.id}
            />
          ))}
        </div>
        <PaginationButtons
          url="/admin/users/offset/:offset"
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
    users: state.adminUsers.users,
    count: state.adminUsers.count,
    user: state.user
  }
}

const mapDispatch = dispatch => {
  return {
    getUsers: offset => dispatch(getAdminUsers(offset)),
    deleteThisUser: userId => {
      dispatch(deleteUser(userId))
    }
  }
}

export default connect(mapState, mapDispatch)(AdminUsersView)
