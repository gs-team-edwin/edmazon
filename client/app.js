import React from 'react'
import {Navbar} from './components'
import AllProducts from './components/AllProducts'
import Routes from './routes'
import {connect} from 'react-redux'

class App extends React.Component {
  render() {
    return (
      <div>
        <Navbar />
        <Routes />
      </div>
    )
  }
}

export default connect(null, null)(App)
