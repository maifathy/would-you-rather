import React, { Component, Fragment } from 'react'
import 'bootstrap/dist/css/bootstrap.css';
import { connect } from 'react-redux'
import handleInitialData from '../actions/shared.js'
import Dashboard from './Dashboard.js'
import Leaderboard from './Leaderboard.js'
import Poll from './Poll.js'
import NewPoll from './NewPoll.js'
import NavMenu from './NavMenu.js'
import Login from './Login.js'
import LoadingBar from 'react-redux-loading'
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'

class App extends Component {
  componentDidMount(){
    this.props.dispatch(handleInitialData())
  }

  render(){
    return (
      <Router>
        <Fragment>
          <LoadingBar />
          <NavMenu />
          <Route path='/login' component={Login} />
          {this.props.loading === true
            ? <Redirect to='/login' />
            :
            <div>
              <Route path='/' exact component={Dashboard} />
              <Route path='/questions/:id' component={Poll} />
              <Route path='/add' component={NewPoll} />
              <Route path='/leaderboard' component={Leaderboard} />
            </div>
          }
        </Fragment>
      </Router>
    )
  }
}

function mapStateToProps ({ authedUser }) {
  return {
    loading: authedUser === null
  }
}
export default connect(mapStateToProps)(App);
