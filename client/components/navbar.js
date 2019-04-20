import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout, setPopup, closePopup} from '../store'
import {SearchBar, CartButton} from './index'
import history from '../history'

class Navbar extends React.Component {
  componentDidUpdate() {
    // close the popup if we have successfully logged in
    if (this.props.isLoggedIn && this.props.popup) {
      this.props.closePopup()
    }
  }

  render() {
    const {
      handleClick,
      isLoggedIn,
      openLoginPopup,
      openSignupPopup,
      userType,
      userId,
      userEmail
    } = this.props
    return (
      <div className="navbar">
        <h1
          className="navbar-title"
          onClick={() => history.push('/products/offset/0')}
        >
          EDMAZON
        </h1>
        <nav className="navbar-right-box">
          {isLoggedIn ? (
            <span className="navbar-link-container">
              <span className="login-message">
                <div>Welcome,</div>
                <div>{userEmail}!</div>
              </span>
              {userType === 'admin' && (
                <button type="button" onClick={() => history.push('/admin')}>
                  Admin
                </button>
              )}
              <button
                type="button"
                onClick={() => history.push(`/user/${userId}/orders/offset/0`)}
              >
                My Orders
              </button>
              <button type="button" onClick={handleClick}>
                Logout
              </button>
            </span>
          ) : (
            <span className="navbar-link-container">
              <button type="button" onClick={() => openLoginPopup()}>
                Login
              </button>
              <button
                type="button"
                onClick={() => {
                  openSignupPopup()
                }}
              >
                Sign Up
              </button>
            </span>
          )}
          <SearchBar />
          <CartButton />
        </nav>
      </div>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id,
    userType: state.user.userType,
    userId: state.user.id,
    userEmail: state.user.email
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    },
    openLoginPopup() {
      dispatch(setPopup('login'))
    },
    openSignupPopup() {
      dispatch(setPopup('signup'))
    },
    closePopup() {
      dispatch(closePopup())
    }
  }
}

export default connect(mapState, mapDispatch)(Navbar)

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
