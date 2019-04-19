import React from 'react'
import {Navbar, NavCategoryBar} from './components'
import {LoginPopup, SignupPopup} from './components/'
import Routes from './routes'
import {connect} from 'react-redux'

class App extends React.Component {
  render() {
    const {popup} = this.props
    return (
      <div>
        {popup === 'login' && <LoginPopup />}
        {popup === 'signup' && <SignupPopup />}
        <Navbar />
        <NavCategoryBar />
        <Routes />
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    popup: state.popup
  }
}

export default connect(mapStateToProps, null)(App)
