import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {getAllProducts} from '../store/productspage'

class AllProducts extends Component {
  componentDidMount() {
    this.props.loadNewData(this.props.match.params.id)
  }
  render() {
    const products = this.props.productspage
    return (
      <div>
        <div>
          {products.map(product => <li key={product.id}>{product.title}</li>)}
        </div>
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
    productspage: state.productspage
  }
}

const mapDispatch = dispatch => {
  return {
    loadNewData: input => dispatch(getAllProducts(input))
  }
}

export default connect(mapStateToProps, mapDispatch)(AllProducts)
