import React, {Component} from 'react'
import {connect} from 'react-redux'
import {addProductThunkCreator} from '../store/addproduct'

export class AddProduct extends Component {
  constructor() {
    super()
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  handleSubmit(evt) {
    evt.preventDefault()
    const title = evt.target.title.value
    const description = evt.target.description.value
    const price = evt.target.price.value
    const quantity = evt.target.quantity.value
    this.props.addProduct({title, description, price, quantity})
  }
  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit} name={name}>
          <div className="form-item">
            <small>Title</small>
            <input name="title" type="text" />
          </div>
          <div className="form-item">
            <small>Description</small>
            <input name="description" type="text" />
          </div>
          <div className="form-item">
            <small>Price</small>
            <input name="price" type="text" />
          </div>
          <div className="form-item">
            <small>Quantity</small>
            <input name="quantity" type="text" />
          </div>
          <div className="form-item">
            <small>Upload Photo</small>
            <input name="photo" type="file" />
          </div>
          <div className="form-item">
            <button className="admin-button" type="submit">
              Submit
            </button>
          </div>
        </form>
      </div>
    )
  }
}

const mapDispatch = dispatch => {
  return {
    addProduct: values => dispatch(addProductThunkCreator(values))
  }
}

export default connect(null, mapDispatch)(AddProduct)
