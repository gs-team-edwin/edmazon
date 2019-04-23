import React from 'react'
import {connect} from 'react-redux'
import {writeReview, closePopup} from '../store'
//update order History with addreses

class ReviewForm extends React.Component {
  constructor() {
    super()
    this.state = {
      stars: 5,
      title: '',
      body: ''
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  async handleSubmit(event) {
    try {
      event.preventDefault() //REMOVED THIS TO POST REVIEW.

      await this.props.writeReview(this.props.productId, {
        stars: this.state.stars,
        title: this.state.title,
        body: this.state.body,
        productId: Number(this.props.productId),
        userId: 10
      })
      this.props.closePopup()
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
    const {productId} = this.props

    console.log(this.props)
    return (
      <div className="popup-outer-container">
        <div className="popup">
          <form onSubmit={this.handleSubmit} method="POST">
            <h3>Write Review</h3>
            <div className="form-item">
              <label htmlFor="stars">STARS</label>
              <select
                required
                className="star-select"
                type="radio"
                name="stars"
                onChange={this.handleChange}
                value={stars}
              >
                <option value="5">5</option>
                <option value="4">4</option>
                <option value="3">3</option>
                <option value="2">2</option>
                <option value="1">1</option>
              </select>
              <label htmlFor="title">Title:</label>
              <input
                required
                type="text"
                name="title"
                onChange={this.handleChange}
                value={title}
              />
            </div>
            <div className="form-item">
              <label htmlFor="body">review</label>
              <textarea
                required
                rows="10"
                cols="100"
                type="text"
                name="body"
                onChange={this.handleChange}
                value={body}
              />
            </div>
            <div>
              <div>
                <button className="popup-form-button" type="submit">
                  Submit
                </button>
              </div>
            </div>
          </form>
          <button
            type="button"
            className="popup-close-button"
            onClick={() => this.props.closePopup()}
          >
            Close
          </button>
        </div>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  writeReview: (userId, review) => dispatch(writeReview(userId, review)),
  closePopup: () => dispatch(closePopup())
})

export default connect(null, mapDispatchToProps)(ReviewForm)
