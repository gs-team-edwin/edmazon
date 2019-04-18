import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {getProductByCategory} from '../store/'

class CategoryProducts extends Component {
  componentDidMount() {
    this.props.gotAllProducts(this.props.match.params.categoryId, this.props.match.params.offset)
  }
  render() {
    const products = this.props.products
    return (
      <div>
        <ul type="none">
          {products.map(product => (
            <li key={product.id}>
              <img src={`${product.photos[0].photoUrl}`}/>
              <Link to={`/product/${product.id}`}> {product.title}</Link>
              <div>${product.price}</div>
            </li>
          ))}
        </ul>
        <div>
          {this.props.match.params.offset > 0 && (
            <button
              type="button"
              onClick={() =>
                this.props.gotAllProducts(this.props.match.params.categoryId,
                  parseInt(this.props.match.params.offset, 10) - 1
                )
              }
            >
              Previous
            </button>
          )}
          <button
            type="button"
            onClick={() =>
              this.props.gotAllProducts(this.props.match.params.categoryId,
                parseInt(this.props.match.params.offset, 10) + 1
              )
            }
          >
            Next
          </button>
        </div>
      </div>
    )
  }
}
const mapStateToProps = state => {
  return {
    products: state.products
  }
}

const mapDispatch = dispatch => {
  return {
    gotAllProducts: (category, offset) => dispatch(getProductByCategory(category, offset))
  }
}

export default connect(mapStateToProps, mapDispatch)(CategoryProducts)
