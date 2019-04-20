import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {getProductByCategory} from '../store/'
import {PaginationButtons} from './'
import history from '../history'

class CategoryProducts extends Component {
  componentDidMount() {
    const categoryId = Number(this.props.match.params.categoryId)
    const offset = Number(this.props.match.params.offset)
    this.props.getProducts(categoryId, offset)
  }

  render() {
    const {products, count} = this.props
    const {categoryId} = this.props.match.params
    const offset = Number(this.props.match.params.offset)

    return (
      <div>
        <ul type="none">
          {products.map(product => (
            <li key={product.id}>
              <img src={`${product.photos[0].photoUrl}`} />
              <Link to={`/product/${product.id}`}> {product.title}</Link>
              <div>${product.price}</div>
            </li>
          ))}
        </ul>
        <PaginationButtons
          url={`/products/categories/${categoryId}/offset/:offset`}
          offset={offset}
          pageSize={20}
          count={count}
        />
      </div>
    )
  }
}
const mapStateToProps = state => {
  return {
    products: state.products.products,
    count: state.products.count
  }
}

const mapDispatch = dispatch => {
  return {
    getProducts: (category, offset) =>
      dispatch(getProductByCategory(category, offset))
  }
}

export default connect(mapStateToProps, mapDispatch)(CategoryProducts)
