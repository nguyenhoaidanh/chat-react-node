/**
 * APP Container thường dùng để chứa layout (header, footer) và container con
 */

import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as appActions from '../actions/app'
import loadingImg from '../../resources/images/ripple.svg'

import { withRouter, Switch, Route } from 'react-router-dom'
import Chat from './Chat'
import ListUser from './ListUser'
import NotFoundPage from '../../components/NotFoundPage'

class App extends React.Component {
  render() {
    //DEBUG
    if (process.env.NODE_ENV === 'development') {
      console.log('Render: ', 'App')
    }
    return ( 
        <div> 
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-4 col-xl-4 chat">
                <ListUser />
              </div>
              <div className="col-md-8 col-xl-8 chat">
                <Chat />
              </div>
            </div>
          </div>
        </div> 
    )
  }
}

function mapStateToProps(state) {
  return {
    app: state.app
  }
}

function mapDispatchToProps(dispatch) {
  return {
    appActions: bindActionCreators(appActions, dispatch)
  }
}

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(App)
)
