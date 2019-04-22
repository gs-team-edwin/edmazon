import React from 'react'
import {connect} from 'react-redux'
import history from '../history'
import {Link} from 'react-router-dom'
import {ReviewForm} from './'
import {setPopup} from '../store'

class LargeProductCard extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedPhoto: 1
    }
  }
  render() {
    const {product, openReviewPopup, popup, user} = this.props

    return (
      <div className="large-product-card">
        {product.photos && (
          <div className="large-product-card-left">
            <img
              className="large-product-card-main-image"
              src={`${product.photos[this.state.selectedPhoto - 1].photoUrl}`}
            />
            <div className="tiny-image-container">
              {product.photos.map(photo => (
                <img
                  className="tiny-image"
                  key={photo.id}
                  src={photo.photoUrl}
                  onClick={() => this.setState({selectedPhoto: photo.id})}
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
                Write Reivew
              </button>
            )}
            {popup === 'review' && <ReviewForm productId={product.id} />}
            {user.id &&
              user.userType === 'admin' && (
                <button
                  type="button"
                  onClick={() => console.log('Edit button clicked')}
                  className="large-product-card-button"
                >
                  Edit Product Info
                </button>
              )}
            <form className="add-to-cart-container">
              <select
                onChange={() => console.log('changed selector')}
                value={1}
                className="cart-qty-selector"
                name="qty"
              >
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">4</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </select>
              <button
                type="button"
                onClick={() => console.log('Add to cart button clicked')}
                className="large-product-card-button cart"
              >
                Add to cart
              </button>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

const mapState = state => ({
  popup: state.popup,
  user: state.user
})

const mapDispatchToProps = dispatch => ({
  openReviewPopup() {
    dispatch(setPopup('review'))
  }
})

export default connect(mapState, mapDispatchToProps)(LargeProductCard)
