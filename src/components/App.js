import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import Posts from './Posts'
import Form from './Form'
import MUI from './MUI'

const App = ({ isFetching }) => {
  const header = <h1>{ isFetching ? 'Fetching posts...' : 'Reddit Simulator' }</h1>
  return <MUI><div>
      { header }
      <Form/>
  <Posts/>
    </div>
    </MUI>
}

App.contextTypes = {
  store: PropTypes.object
}

const mapStateToProps = state => (
  // console.log('App mapStateTopProps', state)
  {
    isFetching: state.pageState.isFetching
  }
)

export default connect(mapStateToProps)(App)
