import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'
import {getAllProducts} from '../store/product'

class AllProducts extends Component {
  componentDidMount() {
    this.props.loadInitialData()
  }
  render() {
    const products = this.props.products
    console.log(products)
    return (
      <div>
        {products.map(product => <li key={product.id}>{product.title}</li>)}
      </div>
    )
  }
}
const mapStateToProps = state => {
  return {
    products: state.product
  }
}

const mapDispatch = dispatch => {
  return {
    loadInitialData() {
      dispatch(getAllProducts())
    }
  }
}

export default connect(mapStateToProps, mapDispatch)(AllProducts)
