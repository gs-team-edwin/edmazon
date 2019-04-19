import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {getAllReviews} from '../store/reviews'

class Reviews extends Component {
  componentDidMount() {
    this.props.getAllReviews(this.props.match.params.id)
  }
  render() {
    const {reviews} = this.props
    console.log(reviews)
    return (
      <div>
        <h2>Reviews</h2>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    review: state.review
  }
}

const mapDispatch = dispatch => {
  return {
    getAllReviews: input => dispatch(getAllReviews(input))
  }
}

export default connect(mapStateToProps, mapDispatch)(Reviews)
