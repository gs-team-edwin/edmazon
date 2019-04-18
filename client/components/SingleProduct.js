import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {getSingleProduct} from '../store/selectedproduct'

class SingleProduct extends Component {
  componentDidMount() {
    this.props.gotSingleProduct(this.props.match.params.id)
  }
  render() {
    const selectedProduct = this.props.selectedProduct
    console.log(this.props)
    return (<div>
      {selectedProduct.title}
    </div>)
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
