import React from 'react'
import {Link} from 'react-router-dom'


const orderItem = (props) => {
    return (
        <div className="cart-products">
            <Link to={`/product/${props.product.id}`}>{props.product.title}</Link>
            <div> ${props.product.price}</div>
            <button
                className="popup-close-button"
                type="button"
                onClick={() => props.removeItem(props.product.id)}
            > Close </button>
        </div>
    )
}

export default orderItem