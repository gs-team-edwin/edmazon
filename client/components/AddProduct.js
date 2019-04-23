import React, {Component} from 'react'
import {connect} from 'react-redux'
import {addProductThunkCreator} from '../store'
import ProductForm from './ProductForm'
import history from '../history'

class AddProduct extends Component {
  constructor() {
    super()
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidUpdate() {
    let newProductId = this.props.newProductId
    history.push(`/product/${newProductId}`)
  }

  handleSubmit(evt) {
    evt.preventDefault()
    const title = evt.target.title.value
    const description = evt.target.description.value
    const price = evt.target.price.value * 100
    const quantityOnHand = evt.target.quantityOnHand.value
    const photo = evt.target.photo.value
    //const categories = evt.target.categories
    this.props.addProduct({title, description, price, quantityOnHand, photo})
  }

  render() {
    return (
      <div>
        <ProductForm handleSubmit = {this.handleSubmit} />
      </div>
    )
  }
}

const mapDispatch = dispatch => {
  return {
    addProduct: values => dispatch(addProductThunkCreator(values))
  }
}

const mapState = state => {
  return {
    newProductId: state.addedProductId
  }
}

export default connect(mapState, mapDispatch)(AddProduct)
