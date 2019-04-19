import React from 'react'
import {connect} from 'react-redux'
//update order History with addreses

class BillingForm extends React.Component {
  constructor() {
    super()
    this.state = {
      firstName: '',
      lastName: '',
      address: '',
      apt: '',
      city: '',
      state: '',
      Country: '',
      zip: '',
      telephone: '',
      cardNumber: '',
      nameOnCard: '',
      expirationDate: ''
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  async handleSubmit(event) {
    try {
      event.preventDefault()
      console.log(`SUBMITTING`, JSON.stringify(this.state))
      // this.setState({
      //   firstName: '',
      //   lastName: '',
      //   address: ''
      // })
    } catch (err) {
      console.log(err)
    }
  }

  handleChange = event => {
    this.setState({
      firstName: event.targe.value
    })
  }
  render() {
    const {firstName, lastName, address} = this.state
    return (
      <form onSubmit={this.handleSubmit}>
        <h1>Shipping & Billing Address</h1>
        <div>
          <label htmlFor="name">firstName:</label>
          <input
            type="text"
            name="name"
            onChange={this.handleChange}
            value={firstName}
          />
          <label htmlFor="name">lastName:</label>
          <input
            type="text"
            name="name"
            onChange={this.handleChange}
            value={lastName}
          />
        </div>
        <div>
          <label htmlFor="adress">Adrress:</label>
          <input
            type="text"
            name="address"
            onChange={this.handleChange}
            value={address}
          />
        </div>
        <div>
          <label htmlFor="adress">Apt:</label>
          <input
            type="text"
            name="address"
            onChange={this.handleChange}
            value={apt}
          />
        </div>
        <div>
          <label htmlFor="adress">City:</label>
          <input
            type="text"
            name="address"
            onChange={this.handleChange}
            value={city}
          />
        </div>
        <div>
          <label htmlFor="adress">State:</label>
          <input
            type="text"
            name="address"
            onChange={this.handleChange}
            value={state}
          />
        </div>
        <div>
          <label htmlFor="adress">Country:</label>
          <input
            type="text"
            name="address"
            onChange={this.handleChange}
            value={country}
          />
        </div>
        <div>
          <label htmlFor="adress">Zip:</label>
          <input
            type="text"
            name="address"
            onChange={this.handleChange}
            value={zip}
          />
        </div>
        <div>
          <label htmlFor="adress">telephone:</label>
          <input
            type="text"
            name="address"
            onChange={this.handleChange}
            value={telephone}
          />
        </div>
        <div>
          <label htmlFor="adress">Card Number:</label>
          <input
            type="text"
            name="address"
            onChange={this.handleChange}
            value={cardNumber}
          />
        </div>
        <div>
          <label htmlFor="adress">Name On Card:</label>
          <input
            type="text"
            name="address"
            onChange={this.handleChange}
            value={nameOnCard}
          />
        </div>
        <div>
          <label htmlFor="adress">Expiration Date:</label>
          <input
            type="text"
            name="address"
            onChange={this.handleChange}
            value={expirationDate}
          />
        </div>
        <div>
          <div>
            <button type="submit">Submit</button>
          </div>
        </div>
      </form>
    )
  }
}

// const mapDispatchToProps = dispatch => ({
//   //placeholder,

//});

//export default connect(null, mapDispatchToProps)(BillingForm)

export default BillingForm
