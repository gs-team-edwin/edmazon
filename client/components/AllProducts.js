import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {getAllProducts} from '../store/'
import {PaginationButtons, SmallProductCard, Carousel} from './'
import history from '../history'

class AllProducts extends Component {
  componentDidMount() {
    const offset = Number(this.props.match.params.offset)
    this.props.getProducts(offset)
  }
  render() {
    const {products, count} = this.props
    const offset = Number(this.props.match.params.offset)
    return (
      <div>
        <Carousel />
        <div className="product-container">
          {products.map(product => (
            <SmallProductCard product={product} key={product.id} />
          ))}
        </div>
        <PaginationButtons
          url="/products/offset/:offset"
          offset={offset}
          pageSize={12}
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
    getProducts: input => dispatch(getAllProducts(input))
  }
}

export default connect(mapStateToProps, mapDispatch)(AllProducts)
