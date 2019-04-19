import React from 'react'
import {connect} from 'react-redux'
//update order History with addreses

class ReviewForm extends React.Component {
  constructor() {
    super()
    this.state = {
      rating: '',
      title: '',
      content: ''
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  async handleSubmit(event) {
    try {
      event.preventDefault()
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
    const {rating, title, content} = this.state
    return (
      <form onSubmit={this.handleSubmit}>
        <h1>Shipping & Billing Address</h1>
        <div>
          <label htmlFor="name">STARS:</label>
          <input
            type="text"
            name="rating"
            onChange={this.handleChange}
            value={rating}
          />
          <label htmlFor="name">Title:</label>
          <input
            type="title"
            name="name"
            onChange={this.handleChange}
            value={title}
          />
        </div>
        <div>
          <label htmlFor="adress">review:</label>
          <input
            type="review"
            name="address"
            onChange={this.handleChange}
            value={content}
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

//export default connect(null, mapDispatchToProps)(ReviewForm)

export default ReviewForm
