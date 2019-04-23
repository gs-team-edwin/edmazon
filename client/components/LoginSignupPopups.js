import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {auth, closePopup, removeUser} from '../store'

class AuthForm extends React.Component {
  render() {
    const {name, displayName, handleSubmit, error, closePopup} = this.props
    return (
      <div className="popup-outer-container">
        <div className="popup">
          <form onSubmit={handleSubmit} name={name}>
            <div className="form-item">
              <label htmlFor="email">
                <small>Email</small>
              </label>
              <input name="email" type="text" />
            </div>
            <div className="form-item">
              <label htmlFor="password">
                <small>Password</small>
              </label>
              <input name="password" type="password" />
            </div>
            <div className="form-item">
              <button className="popup-form-button" type="submit">
                {displayName}
              </button>
            </div>
            {error && error.response && <div> {error.response.data} </div>}
          </form>
          <button
            className="popup-form-button google"
            type="button"
            href="/auth/google"
          >
            {displayName} with Google
          </button>
          <button
            className="popup-close-button"
            type="button"
            onClick={closePopup}
          >
            Close
          </button>
        </div>
      </div>
    )
  }
}

/**
 * CONTAINER
 *   Note that we have two different sets of 'mapStateToProps' functions -
 *   one for Login, and one for Signup. However, they share the same 'mapDispatchToProps'
 *   function, and share the same Component. This is a good example of how we
 *   can stay DRY with interfaces that are very similar to each other!
 */
const mapLogin = state => {
  return {
    name: 'login',
    displayName: 'Login',
    error: state.user.error
  }
}

const mapSignup = state => {
  return {
    name: 'signup',
    displayName: 'Sign Up',
    error: state.user.error,
    user: state.user
  }
}

const mapDispatch = dispatch => {
  return {
    // try to log in / sign up
    handleSubmit(evt) {
      evt.preventDefault()
      const formName = evt.target.name
      const email = evt.target.email.value
      const password = evt.target.password.value
      dispatch(auth(email, password, formName))
    },
    closePopup: () => {
      dispatch(closePopup())
      // hack to clear the error message on popup close
      dispatch(removeUser())
    }
  }
}

export const LoginPopup = connect(mapLogin, mapDispatch)(AuthForm)
export const SignupPopup = connect(mapSignup, mapDispatch)(AuthForm)

/**
 * PROP TYPES
 */
AuthForm.propTypes = {
  name: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.object
}
