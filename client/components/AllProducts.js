import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {getAllProducts} from '../store/'

class AllProducts extends Component {
  componentDidMount() {
    this.props.loadNewData(this.props.match.params.id)
  }
  render() {
    const products = this.props.products
    console.log('*** products: ', products)
    console.log(this.props)
    return (
      <div>
        <ul type="none">
          {products.map(product => (
            <li key={product.id}>
              <Link to={`/product/${product.id}`}> {product.title}</Link>
              <div>${product.price}</div>
            </li>
          ))}
        </ul>
        <div>
          <button
            type="Button"
            onClick={() =>
              this.props.loadNewData(
                parseInt(this.props.match.params.id, 10) + 1
              )
            }
          >
            Next
          </button>
          {this.props.match.params.id > 0 ? (
            <button
              type="Button"
              onClick={() =>
                this.props.loadNewData(
                  parseInt(this.props.match.params.id, 10) - 1
                )
              }
            >
              Previous
            </button>
          ) : (
            <div />
          )}
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
    loadNewData: input => dispatch(getAllProducts(input))
  }
}

export default connect(mapStateToProps, mapDispatch)(AllProducts)
