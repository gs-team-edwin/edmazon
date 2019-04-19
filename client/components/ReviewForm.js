import React from 'react'
import {connect} from 'react-redux'
import {writeReview} from '../store/reviews'
//update order History with addreses

//STILL NEEDS WORK

class ReviewForm extends React.Component {
  constructor() {
    super()
    this.state = {
      stars: 0,
      title: '',
      body: ''
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  async handleSubmit(event) {
    try {
      event.preventDefault()
      await this.props.writeReview(this.props.match.params.id, {
        stars: this.state.stars,
        title: this.state.title,
        body: this.state.body,
        productId: Number(this.props.match.params.id),
        userId: 10
      })
      this.props.history.push(`/product/${this.props.match.params.id}`)
    } catch (err) {
      console.log(err)
    }
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }
  render() {
    const {stars, title, body} = this.state
    return (
      <form onSubmit={this.handleSubmit}>
        <h3>Review Products</h3>
        <div>
          <label htmlFor="name">STARS:</label>
          <input
            type="text"
            name="stars"
            onChange={this.handleChange}
            value={stars}
          />
          <label htmlFor="title">Title:</label>
          <input
            required
            type="text"
            name="title"
            onChange={this.handleChange}
            value={title}
          />
        </div>
        <div>
          <label htmlFor="body">review:</label>
          <input
            required
            type="text"
            name="body"
            onChange={this.handleChange}
            value={body}
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

const mapDispatchToProps = dispatch => ({
  writeReview: (userId, review) => dispatch(writeReview(userId, review))
})

export default connect(null, mapDispatchToProps)(ReviewForm)

//export default ReviewForm
