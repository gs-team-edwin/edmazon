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
      price = (this.props.price / 100).toFixed(2)
      quantityOnHand = this.props.quantityOnHand
      photo = ''
      categories = this.props.globalCategories.map(category => ({
        id: category.id,
        checked: false
      }))
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
    console.log('this.state.categories', this.state.categories)
    console.log('this.props.categories', this.props.categories)
    return (
      <div className="popup-outer-container">
        <div className="popup">
          <form onSubmit={this.props.handleSubmit} name={name}>
            <div className="form-item">
              <label>Title</label>
              <input
                className="bigger"
                onChange={evt => this.handleChange(evt)}
                name="title"
                value={this.state.title}
                type="text"
              />
            </div>
            <div className="form-item">
              <label>Description</label>
              <textarea
                className="bigger"
                onChange={evt => this.handleChange(evt)}
                name="description"
                value={this.state.description}
                type="text"
              />
            </div>
            <div className="form-item-row">
              <div className="form-item">
                <label>Price (Float, 2 places)</label>
                <input
                  className=""
                  onChange={evt => this.handleChange(evt)}
                  name="price"
                  value={this.state.price}
                  type="number"
                />
              </div>
              <div className="form-item">
                <label>Quantity</label>
                <input
                  className=""
                  onChange={evt => this.handleChange(evt)}
                  name="quantityOnHand"
                  value={this.state.quantityOnHand}
                  type="number"
                />
              </div>
            </div>
            <div className="form-item">
              <label>New Photo URL</label>
              <input
                className="bigger"
                onChange={evt => this.handleChange(evt)}
                name="photo"
                value={this.state.photo}
                type="text"
              />
            </div>
            <div className="form-item-checkboxes">
              {this.props.categories.map(category => {
                return (
                  <div key={category.id} className="category-selector-row">
                    <span className="category-selector-label">
                      {category.name}
                    </span>
                    <input type="checkbox" className="form-checkbox" />
                  </div>
                )
              })}
            </div>

            <div className="form-item">
              <button className="popup-form-button" type="submit">
                Submit
              </button>
            </div>
            <button
              className="popup-close-button"
              type="button"
              onClick={() => this.props.closePopup()}
            >
              Close
            </button>
          </form>
        </div>
      </div>
    )
  }
}

const mapState = state => {
  return {
    globalCategories: state.categories
  }
}

const mapDispatch = dispatch => {
  return {
    closePopup: () => {
      dispatch(closePopup())
    }
  }
}

export default connect(mapState, mapDispatch)(productForm)
