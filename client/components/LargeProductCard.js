/* eslint-disable complexity */
import React from 'react'
import {connect} from 'react-redux'
import history from '../history'
import {Link} from 'react-router-dom'
import {ReviewForm} from './'
import {setPopup, addToCart, incrementCartLength, getCartThunk} from '../store'
import { EditProduct } from './EditProduct';

class LargeProductCard extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedPhoto: 1,
      cartQuantity: 1
    }
    this.quantityClickHandler = this.quantityClickHandler.bind(this)
    this.submitHandler = this.submitHandler.bind(this)
  }

  componentDidMount() {
    this.props.getCart()
  }

  quantityClickHandler(evt) {
    evt.preventDefault()
    this.setState({cartQuantity: evt.target.value})
  }

  submitHandler(evt) {
    evt.preventDefault()
    this.props.addToCart(
      this.props.product.id,
      this.state.cartQuantity,
      this.props.user.id
    )
    this.props.incrementCart()
  }

  render() {
    const {product, openReviewPopup, popup, user, cartProducts} = this.props
    const productId = product.id
    console.log('cartProducts: ', cartProducts)
    return (
      <div className="large-product-card">
        {product.photos && (
          <div className="large-product-card-left">
            <img
              className="large-product-card-main-image"
              src={`${product.photos[this.state.selectedPhoto - 1].photoUrl}`}
            />
            <div className="tiny-image-container">
              {product.photos.map((photo, i) => (
                <img
                  className="tiny-image"
                  key={photo.id}
                  src={photo.photoUrl}
                  onClick={() => {
                    this.setState({selectedPhoto: i + 1})
                  }}
                />
              ))}
            </div>
          </div>
        )}

        <div className="large-product-card-right">
          <div className="large-product-card-title">{product.title}</div>
          <div className="large-product-card-categories">
            {product.categories &&
              product.categories.map(cat => (
                <button
                  key={cat.id}
                  className="large-category-link"
                  type="button"
                  onClick={() =>
                    history.push(`/products/categories/${cat.id}/offset/0`)
                  }
                >
                  {cat.name}
                </button>
              ))}
          </div>
          <div className="large-product-card-price-row">
            <span className="large-product-card-price">
              ${(product.price / 100).toFixed(2)}
            </span>
            {product.quantityOnHand > 0 ? (
              <span className="stock-indicator in">IN STOCK</span>
            ) : (
              <span className="stock-indicator out">OUT OF STOCK</span>
            )}
          </div>
          <div className="large-product-card-description">
            {product.description}
          </div>
          <div className="large-product-card-button-container">
            {user.id && (
              <button
                type="button"
                onClick={() => openReviewPopup()}
                className="large-product-card-button"
              >
                Write Review
              </button>
            )}
            {popup === 'review' && <ReviewForm productId={product.id} />}
            {user.id &&
              user.userType === 'admin' && (
                <button
                  type="button"
                  onClick={() => this.props.openEditPopup()}
                  className="large-product-card-button"
                >
                  Edit Product Info
                </button>
              )}
              {this.props.popup === 'edit' && <EditProduct product={product} />}
            {product.quantityOnHand > 0 &&
              !cartProducts.includes(Number(productId)) && (
                <form className="add-to-cart-container">
                  <select
                    onChange={evt => {
                      this.quantityClickHandler(evt)
                    }}
                    value={this.state.cartQuantity}
                    className="cart-qty-selector"
                    name="qty"
                  >
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                  </select>
                  <button
                    type="submit"
                    onClick={evt => this.submitHandler(evt)}
                    className="large-product-card-button cart"
                  >
                    Add to cart
                  </button>
                </form>
              )}
          </div>
        </div>
      </div>
    )
  }
}

const mapState = state => ({
  popup: state.popup,
  user: state.user,
  cartProducts: state.selectedOrder.order.products.map(product =>
    Number(product.id)
  )
})

const mapDispatchToProps = dispatch => ({
  openReviewPopup() {
    dispatch(setPopup('review'))
  },
  addToCart(productId, quantity, userId) {
    dispatch(addToCart(productId, quantity, userId))
  },
  incrementCart() {
    dispatch(incrementCartLength())
  },
  getCart() {
    dispatch(getCartThunk())
  },
  openEditPopup() {
    dispatch(setPopup('edit'))
  }
})

export default connect(mapState, mapDispatchToProps)(LargeProductCard)
