import React, {Component} from 'react'
import history from '../history'
import {Link} from 'react-router-dom'

const SmallProductCard = props => {
  const {product} = props
  const productLink = () => history.push(`/product/${product.id}`)
  return (
    <div className="small-product-card ">
      <img
        onClick={productLink}
        className="small-product-card-image"
        src={`${product.photos[0].photoUrl}`}
      />
      <div className="small-product-card-right">
        <div onClick={productLink} className="small-product-card-title">
          {product.title}
        </div>
        <div className="small-product-card-price">${product.price / 100}</div>
        <div className="small-product-card-description">
          {product.description}
        </div>

        <div className="small-product-card-categories">
          {product.categories.map(cat => (
            <button
              key={cat.id}
              className="small-category-link"
              type="button"
              onClick={() =>
                history.push(`/products/categories/${cat.id}/offset/0`)
              }
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

export default SmallProductCard
