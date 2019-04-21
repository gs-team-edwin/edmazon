import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {getProductBySearch} from '../store/'
import {PaginationButtons, SmallProductCard} from './'
import history from '../history'

class SearchResults extends Component {
  componentDidMount() {
    const {term} = this.props.match.params
    const offset = Number(this.props.match.params.offset)
    this.props.getProducts(term, offset)
  }
  // history.push()
  render() {
    const {products, count, found} = this.props
    const {term} = this.props.match.params
    const offset = Number(this.props.match.params.offset)
    return (
      <div>
        {found && (
          <div>
            <div className="page-subhead-container">
              <div className="page-subhead">Results for query "{term}"</div>
            </div>
            <div className="product-container">
              {products.map(product => (
                <SmallProductCard product={product} key={product.id} />
              ))}
            </div>
            <PaginationButtons
              url={`/products/search/${term}/offset/:offset`}
              offset={offset}
              pageSize={12}
              count={count}
            />
          </div>
        )}
        {!found && (
          <div className="page-subhead-container">
            <div className="page-subhead">No results for query "{term}"</div>
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
    found: state.products.found
  }
}

const mapDispatch = dispatch => {
  return {
    getProducts: (term, offset) => dispatch(getProductBySearch(term, offset))
  }
}

export default connect(mapStateToProps, mapDispatch)(SearchResults)
