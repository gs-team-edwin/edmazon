import React from 'react'
import {connect} from 'react-redux'
import history from '../history'
import {Link} from 'react-router-dom'
import {ReviewForm} from './'
import {setPopup} from '../store'

const LargeProductCard = props => {
  const {product, openReviewPopup, popup} = props
  return (
    <div className="large-product-card">
      <div>
        {product.photos && (
          <img
            className="large-product-card-image"
            src={`${product.photos[0].photoUrl}`}
          />
        )}
      </div>
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
        <div className="large-product-card-price">
          ${(product.price / 100).toFixed(2)}
        </div>

        <div className="large-product-card-description">
          {product.description}
        </div>
        <button
          type="button"
          onClick={() => openReviewPopup()}
          className="large-product-card-button"
        >
          Write Reivew
        </button>
        {popup === 'review' && <ReviewForm productId={product.id} />}
        <button
          type="button"
          onClick={() => console.log('Edit button clicked')}
          className="large-product-card-button"
        >
          Edit Product Info
        </button>
        <button
          type="button"
          onClick={() => console.log('Edit button clicked')}
          className="large-product-card-button"
        >
          Add to cart!
        </button>
      </div>
    </div>
  )
}

const mapState = state => ({
  popup: state.popup
})

const mapDispatchToProps = dispatch => ({
  openReviewPopup() {
    dispatch(setPopup('review'))
  }
})

export default connect(mapState, mapDispatchToProps)(LargeProductCard)
