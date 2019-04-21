import React from 'react'
import {connect} from 'react-redux'
import history from '../history'
import {Link} from 'react-router-dom'
import {ReviewForm} from './'
import {setPopup} from '../store'

const LargeProductCard = props => {
  const {product, productId, openReviewPopup, popup} = props
  return (
    <div className="large-product-card">
      <div>
        {product && product.photos ? (
          <img
            className="large-product-card-image"
            src={`${product.photos[0].photoUrl}`}
          />
        ) : (
          <div />
        )}
      </div>
      <div className="large-product-card-right">
        <div className="large-product-card-title">{product.title}</div>
        <div className="large-product-card-price">${product.price}.00</div>
        <div className="large-product-card-description">
          {product.description}
        </div>
      </div>
      <div>
        <ul>
          <button type="button" onClick={() => openReviewPopup()}>
            Write Reivew
          </button>
          {popup === 'review' && <ReviewForm productId={productId} />}
        </ul>
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
  },
  closePopup() {
    dispatch(closePopup())
  }
})

export default connect(mapState, mapDispatchToProps)(LargeProductCard)
