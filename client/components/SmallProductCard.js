import React, {Component} from 'react'
import history from '../history'
import {Link} from 'react-router-dom'

const SmallProductCard = props => {
  const {product} = props
  // `/product/${product.id}`
  return (
    <div className="small-product-card ">
      <img
        className="small-product-card-image"
        src={`${product.photos[0].photoUrl}`}
      />
      <div>{product.title}</div>
      <div>${product.price / 100}</div>
    </div>
  )
}

export default SmallProductCard
