import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {getSingleProduct} from '../store/products'

class SingleProduct extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    console.log(this.props)
    return <div />
  }
}

const mapStateToProps = state => {
  return {
    products: state.products
  }
}

// const mapDispatch = dispatch => {
//   return {
//
//   }
// }

export default connect(mapStateToProps)(SingleProduct)
