import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {getProductByCategory} from '../store/'
import {PaginationButtons, SmallProductCard} from './'
import history from '../history'

class CategoryProducts extends Component {
  componentDidMount() {
    const categoryId = Number(this.props.match.params.categoryId)
    const offset = Number(this.props.match.params.offset)
    this.props.getProducts(categoryId, offset)
  }

  render() {
    const {products, count, found, categories} = this.props
    const {categoryId} = this.props.match.params
    const offset = Number(this.props.match.params.offset)

    let categoryName = categories.length ? categories[categoryId - 1].name : ''

    return (
      <div>
        {!found &&
          count === 0 && (
            <div className="page-subhead-container">
              <div className="page-subhead">Loading</div>
            </div>
          )}
        {found && (
          <div>
            <div className="page-subhead-container">
              <div className="page-subhead">
                Products in category {categoryName}
              </div>
            </div>
            <div className="product-container">
              {products.map(product => (
                <SmallProductCard product={product} key={product.id} />
              ))}
            </div>
            <PaginationButtons
              url={`/products/categories/${categoryId}/offset/:offset`}
              offset={offset}
              pageSize={12}
              count={count}
            />
          </div>
        )}
        {!found && (
          <div className="page-subhead-container">
            <div className="page-subhead">That category is empty</div>
          </div>
        )}
      </div>
    )
  }
}
const mapStateToProps = state => {
  return {
    products: state.products.products,
    count: state.products.count,
    found: state.products.found,
    categories: state.categories
  }
}

const mapDispatch = dispatch => {
  return {
    getProducts: (category, offset) =>
      dispatch(getProductByCategory(category, offset))
  }
}

export default connect(mapStateToProps, mapDispatch)(CategoryProducts)
