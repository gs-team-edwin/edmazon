import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {getSingleProduct} from '../store/selectedproduct'
import {LargeProductCard, ReviewCard} from './'
import history from '../history'

class SingleProduct extends Component {
  componentDidMount() {
    this.props.gotSingleProduct(this.props.match.params.id)
  }
  render() {
    const selectedProduct = this.props.selectedProduct
    const {reviews} = this.props.selectedProduct
    return (
      <div>
        <div className="product-container">
          <LargeProductCard
            product={selectedProduct}
            productId={this.props.match.params.id}
          />
        </div>
        <div className="review-title">REVIEWS</div>
        <div className="review-container">
          {reviews ? (
            reviews.map(review => (
              <ReviewCard review={review} key={review.id} />
            ))
          ) : (
            <div>no reviews</div>
          )}
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    selectedProduct: state.selectedProduct
  }
}

const mapDispatch = dispatch => {
  return {
    gotSingleProduct: input => dispatch(getSingleProduct(input))
  }
}

export default connect(mapStateToProps, mapDispatch)(SingleProduct)
