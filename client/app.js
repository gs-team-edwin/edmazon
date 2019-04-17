import React from 'react'
import {Navbar} from './components'
import {AllProducts, LoginPopup} from './components/'
import Routes from './routes'
import {connect} from 'react-redux'
import {setPopup} from './store'

class App extends React.Component {
  render() {
    const {popup} = this.props
    return (
      <div>
        <Navbar />
        <Routes />
        {popup === 'login' && <LoginPopup />}
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
