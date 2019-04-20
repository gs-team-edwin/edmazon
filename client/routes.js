import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter, Route, Switch} from 'react-router-dom'
import PropTypes from 'prop-types'
import {
  AllProducts,
  SingleProduct,
  OrderHistory,
  AdminMenu,
  BillingForm,
  AddProduct,
  Cart,
  CategoryProducts,
  AdminOrdersView,
  SearchResults,
  ReviewForm
} from './components'

import {me} from './store'
import {Redirect} from 'react-router' //TODO fix back button bug.

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData()
  }

  render() {
    const {isLoggedIn, isAdmin} = this.props

    return (
      <Switch>
        <Route exact path="/product/:id/newreview" component={ReviewForm} />
        <Route exact path="/user/:userId/cart" component={Cart} />
        <Route
          exact
          path="/user/:userId/orders/offset/:offset"
          render={rParams => (
            <OrderHistory {...rParams} key={rParams.match.params.offset} />
          )}
        />
        <Route
          exact
          path="/products/offset/:offset"
          render={rParams => (
            <AllProducts {...rParams} key={rParams.match.url} />
          )}
        />
        <Route
          exact
          path="/products/categories/:categoryId/offset/:offset"
          render={rParams => (
            <CategoryProducts {...rParams} key={rParams.match.url} />
          )}
        />
        <Route
          exact
          path="/product/:id"
          render={rParams => (
            <SingleProduct {...rParams} key={rParams.match.url} />
          )}
        />
        <Route
          exact
          path="/products/search/:term/offset/:offset"
          render={rParams => (
            <SearchResults {...rParams} key={rParams.match.url} />
          )}
        />
        <Route exact path="/billing" component={BillingForm} />

        {isAdmin && (
          <Switch>
            <Route
              exact
              path="/admin/orders/offset/:offset/filter/:filter"
              render={rParams => (
                <AdminOrdersView {...rParams} key={rParams.match.url} />
              )}
            />
            <Route exact path="/admin" component={AdminMenu} />
            <Route exact path="/addproduct" component={AddProduct} />
          </Switch>
        )}

        {/* Redirects */}
        <Redirect
          exact
          from="/admin/orders"
          to="/admin/orders/offset/0/filter/all"
        />
        <Redirect exact from="/" to="/products/offset/0" />
        {isLoggedIn && (
          <Switch>
            {/* Routes placed here are only available after logging in */}
          </Switch>
        )}
      </Switch>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.user that has a truthy id.
    // Otherwise, state.user will be an empty object, and state.user.id will be falsey
    isLoggedIn: !!state.user.id,
    isAdmin: !!state.user.id && state.user.userType === 'admin'
  }
}

const mapDispatch = dispatch => {
  return {
    loadInitialData() {
      dispatch(me())
    }
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes))

/**
 * PROP TYPES
 */
Routes.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
