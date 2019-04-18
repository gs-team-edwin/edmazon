import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {getAllProducts} from '../store/'

class AllProducts extends Component {
  componentDidMount() {
    this.props.loadNewData(this.props.match.params.offset)
  }
  render() {
    const products = this.props.products

    return (
      <div>
        <div>
          {products.map(product => <li key={product.id}>{product.title}</li>)}
        </div>
        <div>
          {this.props.match.params.offset > 0 && (
            <button
              type="button"
              onClick={() =>
                this.props.loadNewData(
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
              this.props.loadNewData(
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
    loadNewData: input => dispatch(getAllProducts(input))
  }
}

export default connect(mapStateToProps, mapDispatch)(AllProducts)
