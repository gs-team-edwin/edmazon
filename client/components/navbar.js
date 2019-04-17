import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'
import {SearchBar} from './index'

class Navbar extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const {handleClick, isLoggedIn} = this.props
    return (
      <div className="navbar">
        <h1 className="navbar-title">EDMAZON</h1>
        <nav className="navbar-right-box">
          {isLoggedIn ? (
            <span className="navbar-link-container">
              {/* The navbar will show these links after you log in */}
              <Link to="/home">Home</Link>
              <a href="#" onClick={handleClick}>
                Logout
              </a>
            </span>
          ) : (
            <span className="navbar-link-container">
              {/* The navbar will show these links before you log in */}
              <Link to="/login">Login</Link>
              <Link to="/signup">Sign Up</Link>
            </span>
          )}
          <SearchBar />
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
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
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
