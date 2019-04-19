import React, {Component} from 'react'
import {getCartProductsThunk} from '../store/cartproducts'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'


export class Cart extends Component {

  componentDidMount() {
    let userId = this.props.match.params.userId
    this.props.getCartProducts(userId)
  }

  render() {
    const subtotal = this.props.cartProducts.reduce((total, amount) => (
    total + amount.price), 0)
    if(this.props.user.id){
      return (
        <div className = "cart-page-width">
          <div>
              <div>
                {this.props.cartProducts.map(product => (
                  <div key={product.id}>
                    <div className="cart-products">
                      <Link to={`/product/${product.id}`}>{product.title}</Link>
                      <div> ${product.price}</div>
                    </div>
                  </div>
                ))}
              </div>
              <div className = "cart-box">Shipping Address</div>
              <div className = "cart-box">Payment Information</div>
              <div className = "cart-box">Cart Review
                {this.props.cartProducts.map((product, index) => (
                  <div key={product.id}>
                    <div>Item {index + 1}: {`$${product.price}`}
                    </div>
                  </div>
                ))}
              </div>
          </div>
          <div>
              <div className = "cart-total">
                Subtotal: ${subtotal} 
                TAX: ${parseFloat(subtotal * .1).toFixed(2)}
                TOTAL: ${subtotal * 1.1}
                YOU SAVED: ${subtotal / 4}
              </div>
          </div>
        </div>
      )
    }
    else{
      return ('Page Loading...')
    }
  }
}

const mapDispatch = dispatch => {
  return {
    getCartProducts: userId => dispatch(getCartProductsThunk(userId))
  }
}

const mapState = state => {
  return {
    user: state.user,
    cartProducts: state.cartProducts
  }
}

export default connect(mapState, mapDispatch)(Cart)