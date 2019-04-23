import React, {Component} from 'react'
import {connect} from 'react-redux'
import {closePopup} from '../store'

class productForm extends Component {
  constructor(props) {
    super(props)
    let title
    let description
    let price
    let quantityOnHand
    let photo
    let categories
    if (this.props.title) {
      title = this.props.title
      description = this.props.description
      price = this.props.price
      quantityOnHand = this.props.quantityOnHand
      photo = ''
      categories = this.props.categories
        .map(category => category.name)
        .join(', ')
    } else {
      title = ''
      description = ''
      price = ''
      quantityOnHand = ''
      photo = ''
      categories = ''
    }
    this.state = {title, description, price, quantityOnHand, photo, categories}
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(evt) {
    this.setState({[evt.target.name]: evt.target.value})
  }

  render() {
    return (
      <div className="popup-outer-container">
        <div className="popup">
          <form onSubmit={this.props.handleSubmit} name={name}>
            <div className="form-item">
              <small>Title</small>
              <input
                onChange={evt => this.handleChange(evt)}
                name="title"
                value={this.state.title}
                type="text"
              />
            </div>
            <div className="form-item">
              <small>Description</small>
              <input
                onChange={evt => this.handleChange(evt)}
                name="description"
                value={this.state.description}
                type="text"
              />
            </div>
            <div className="form-item">
              <small>Price</small>
              <input
                onChange={evt => this.handleChange(evt)}
                name="price"
                value={this.state.price}
                type="text"
              />
            </div>
            <div className="form-item">
              <small>Quantity</small>
              <input
                onChange={evt => this.handleChange(evt)}
                name="quantityOnHand"
                value={this.state.quantityOnHand}
                type="text"
              />
            </div>
            <div className="form-item">
              <small>Photo</small>
              <input
                onChange={evt => this.handleChange(evt)}
                name="photo"
                value={this.state.photo}
                type="text"
              />
            </div>
            <div className="form-item">
              <small>Categories</small>
              <input
                onChange={evt => this.handleChange(evt)}
                name="categories"
                value={this.state.categories}
                type="text"
              />
            </div>
            <div className="form-item">
              <button className="admin-button" type="submit">
                Submit
              </button>
            </div>
            <button
              className="popup-close-button"
              type="button"
              onClick={this.props.closePopup}
            >
              Close
            </button>
          </form>
        </div>
      </div>
    )
  }
}

const mapDispatch = dispatch => {
  return {
    closePopup: () => {
      dispatch(closePopup())
    }
  }
}

export default connect(null, mapDispatch)(productForm)
