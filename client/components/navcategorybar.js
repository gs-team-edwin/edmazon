import React from 'react'
import history from '../history'
import {connect} from 'react-redux'
import {getProductByCategory} from '../store/products'
import {getAllCategories} from '../store/categories'

class NavCategoryBar extends React.Component {
  componentDidMount() {
    this.props.gotAllCategories()
  }
  render() {
    let categories = this.props.categories
    return (
      <div className="navbar categories">
        {categories.map(category => (
          <button
            key={category.id}
            type="button"
            onClick={() =>
              history.push(`/products/categories/${category.id}/offset/0`)
            }
          >
            {category.name.toUpperCase()}
          </button>
        ))}
      </div>
    )
  }
}
const mapStateToProps = state => {
  return {
    categories: state.categories
  }
}
const mapDispatch = dispatch => {
  return {
    gotAllProducts: (category, offset) =>
      dispatch(getProductByCategory(category, offset)),
    gotAllCategories: () => dispatch(getAllCategories())
  }
}
export default connect(mapStateToProps, mapDispatch)(NavCategoryBar)

/**
 * CONTAINER
 */
