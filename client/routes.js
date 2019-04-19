import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter, Route, Switch} from 'react-router-dom'
import PropTypes from 'prop-types'
import {UserHome, AllProducts, SingleProduct, OrderHistory, BillingForm, CategoryProducts, SearchResults} from './components'
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
    const {isLoggedIn} = this.props

    return (
      <Switch>
        {/* Routes placed here are available to all visitors */}
        <Route exact path="/products/page/:offset" render={rParams =>{return <AllProducts {...rParams} key={rParams.match.url}/>} }/>
        <Route exact path="/products/categories/:categoryId/page/:offset" render={rParams => {return <CategoryProducts {...rParams} key={rParams.match.url} />}} />
        <Route exact path="/products/search/:term/page/:offset" render={(rParams)=>{ return (<SearchResults {...rParams} key={rParams.match.url}/>)} }/>
        <Route exact path="/product/:id" render={rParams => {return <SingleProduct {...rParams} key={rParams.match.url} />}} />
        <Route
          exact
          path="/user/:userId/orders/page/:offset"
          component={OrderHistory}
        />
        <Route exact path="/billing" component={BillingForm} />
        <Redirect exact from="/" to="/products/page/0" />
        {isLoggedIn && (
          <Switch>
            {/* Routes placed here are only available after logging in */}
            <Route path="/home" component={UserHome} />
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
    isLoggedIn: !!state.user.id
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
