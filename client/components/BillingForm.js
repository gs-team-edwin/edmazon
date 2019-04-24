import React from 'react'
import {connect} from 'react-redux'
import {closePopup, purchaseThunk} from '../store'
import StripeCheckout from 'react-stripe-checkout'

class BillingForm extends React.Component {
  constructor() {
    super()
    this.state = {
      firstName: '',
      lastName: '',
      address1: '',
      address2: '',
      company: '',
      city: '',
      state: '',
      country: '',
      zip: '',
      telephone: ''
    }
    this.onToken = this.onToken.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }
  async onToken(token) {
    await this.props.payForProducts(this.props.orderId, token, this.state)
    this.props.closePopup()
    // await this.props.confirmOrder(this.props.orderId, this.state)
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }
  render() {
    let subTotal = this.props.cost
    return (
      <div className="popup-outer-container">
        <div className="popup">
          <form onSubmit={this.handleSubmit}>
            <h1>Shipping and Billing Address</h1>
            <div>
              <label htmlFor="name">First Name</label>
              <input
                type="text"
                name="firstName"
                onChange={this.handleChange}
              />
              <label htmlFor="name">Last Name</label>
              <input type="text" name="lastName" onChange={this.handleChange} />
            </div>
            <div>
              <label htmlFor="adress">Address</label>
              <input type="text" name="address1" onChange={this.handleChange} />
            </div>
            <div>
              <label htmlFor="adress">Address</label>
              <input type="text" name="address2" onChange={this.handleChange} />
            </div>
            <div>
              <label htmlFor="adress">Company</label>
              <input type="text" name="company" onChange={this.handleChange} />
            </div>
            <div>
              <label htmlFor="adress">City</label>
              <input type="text" name="city" onChange={this.handleChange} />
              <label htmlFor="adress">State</label>
              <input type="text" name="state" onChange={this.handleChange} />
            </div>
            <div>
              <label htmlFor="adress">Country</label>
              <input type="text" name="country" onChange={this.handleChange} />
              <label htmlFor="adress">Zip</label>
              <input type="text" name="zip" onChange={this.handleChange} />
            </div>
            <div>
              <label htmlFor="adress">Telephone</label>
              <input
                type="text"
                name="telephone"
                onChange={this.handleChange}
              />
            </div>
            <div>
              <div />
            </div>
          </form>
          <StripeCheckout
            token={this.onToken}
            stripeKey="pk_test_HooeFoS7quAixEoIaZpFxvas00lGh0PGd8"
            amount={subTotal}
          />

          <button type="button" onClick={() => this.props.closePopup()}>
            Cancel
          </button>
        </div>
      </div>
    )
  }
}

const mapState = state => ({
  popup: state.popup
})
const mapDispatch = dispatch => {
  return {
    payForProducts: (id, token, address) =>
      dispatch(purchaseThunk(id, token, address)),
    closePopup: () => dispatch(closePopup())
  }
}
export default connect(mapState, mapDispatch)(BillingForm)
