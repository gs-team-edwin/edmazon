import React, {Component} from 'react'
import {connect} from 'react-redux'
import ProductForm from './ProductForm'
import history from '../history'
import {editProductThunkCreator} from '../store'
import {closePopup} from '../store'

class EditProduct extends Component {
  constructor() {
    super()
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit(evt) {
    evt.preventDefault()
    const title = evt.target.title.value
    const description = evt.target.description.value
    const price = evt.target.price.value * 100
    const quantityOnHand = evt.target.quantityOnHand.value
    const photo = evt.target.photo.value
    //const categories = evt.target.categories.value
    const product = this.props.product
    this.props.editProduct({
      title: title,
      description: description,
      price: price,
      quantityOnHand: quantityOnHand,
      photo: photo,
      product: product
    })
    this.props.closePopup()
  }
  render() {
    let {
      title,
      description,
      price,
      quantityOnHand,
      photo,
      categories
    } = this.props.product
    return (
      <div>
        <ProductForm
          handleSubmit={this.handleSubmit}
          title={title}
          description={description}
          price={price}
          quantityOnHand={quantityOnHand}
          photo={photo}
          categories={categories}
        />
      </div>
    )
  }
}

const mapState = state => {
  return {
    selectedProduct: state.selectedProduct
  }
}

const mapDispatch = dispatch => {
  return {
    editProduct: productInfo => dispatch(editProductThunkCreator(productInfo)),
    closePopup: () => dispatch(closePopup())
  }
}

export default connect(mapState, mapDispatch)(EditProduct)
