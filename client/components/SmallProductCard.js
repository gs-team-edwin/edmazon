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
      <div className="small-product-card-right">
        <div className="small-product-card-title">{product.title}</div>
        <div className="small-product-card-price">${product.price / 100}</div>
      </div>
    </div>
  )
}

export default SmallProductCard
