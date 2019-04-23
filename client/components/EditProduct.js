import React, {Component} from 'react'
import {connect} from 'react-redux'
import ProductForm from './ProductForm'
import history from '../history'

export class EditProduct extends Component {
  constructor() {
    super()
  }

  handleSubmit(evt) {
    evt.preventDefault()
    const title = evt.target.title.value
    const description = evt.target.description.value
    const price = evt.target.price.value * 100
    const quantityOnHand = evt.target.quantityOnHand.value
    const photo = evt.target.photo.value
    const categories = evt.target.categories.value
    //this.props.editProduct({title, description, price, quantityOnHand, photo})
  }
  render() {
    let {title, description, price, quantityOnHand, photo, categories} = this.props.product
    return (
      <div>
        <ProductForm handleSubmit = {this.handleSubmit} title={title} description={description} price={price} quantityOnHand={quantityOnHand} photo={photo} categories={categories} />
      </div>
    )
  }
}

const mapState = state => {
    return {
      selectedProduct: state.selectedProduct,
    }
  }

// const mapDispatch = dispatch => {
//   return {
//     editProduct: values => dispatch(editProductThunkCreator(values))
//   }
// }

export default connect(mapState, null)(EditProduct)
