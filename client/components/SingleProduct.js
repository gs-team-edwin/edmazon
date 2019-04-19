import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {getSingleProduct} from '../store/selectedproduct'
import history from '../history'

class SingleProduct extends Component {
  componentDidMount() {
    this.props.gotSingleProduct(this.props.match.params.id)
  }
  render() {
    const selectedProduct = this.props.selectedProduct
    return (
      <div>
        <h1>{selectedProduct.title}</h1>
        <ul>
          <h2>${selectedProduct.price}.00</h2>
        </ul>
        <ul>
          {this.props.selectedProduct && this.props.selectedProduct.photos ? (
            <img src={`${this.props.selectedProduct.photos[0].photoUrl}`} />
          ) : (
            <div />
          )}
        </ul>
        <div>
          <ul>{selectedProduct.description}</ul>
        </div>
        <ul>
          <h2>REVIEWS</h2>
          {this.props.selectedProduct && this.props.selectedProduct.reviews ? (
            this.props.selectedProduct.reviews.map(review => (
              <div key={review.id}>
                <h4>{review.title}</h4>
                <div>{review.body}</div>
              </div>
            ))
          ) : (
            <div />
          )}
        </ul>
        <div>
          <ul>
            <button
              type="button"
              onClick={() =>
                history.push(
                  `/products/${this.props.match.params.id}/newreview`
                )
              }
            >
              Write Reivew
            </button>
          </ul>
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
