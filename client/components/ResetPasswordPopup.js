import React from 'react'
import {connect} from 'react-redux'
import {closePopup, changePasswordThunk} from '../store'

class ResetPasswordPopup extends React.Component {
  constructor() {
    super()
    this.state = {
      password: ''
    }
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }
  render() {
    const {password} = this.state
    const {closePopup, changePassword} = this.props

    return (
      <div className="popup-outer-container">
        <div className="popup">
          <form
            onSubmit={evt => {
              evt.preventDefault()
              changePassword(password)
              closePopup()
            }}
            method="POST"
          >
            <div className="form-item">
              <label htmlFor="password">NEW PASSWORD</label>
              <input
                required
                type="password"
                name="password"
                onChange={this.handleChange}
                value={password}
              />
            </div>
            <div>
              <button className="popup-form-button" type="submit">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  changePassword: password => dispatch(changePasswordThunk(password)),
  closePopup: () => dispatch(closePopup())
})

export default connect(null, mapDispatchToProps)(ResetPasswordPopup)
