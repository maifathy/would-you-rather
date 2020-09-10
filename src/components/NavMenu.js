import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Nav } from 'react-bootstrap'
import { withRouter, Redirect } from 'react-router-dom'
import { removeAuthUser } from '../actions/authedUser.js'
import { NavLink } from 'react-router-dom'

class NavMenu extends Component {
  changeActive = (e) => {
    if(this.props.user === null)
      e.preventDefault()
  }
  logout = () => {
    this.props.dispatch(removeAuthUser(null))
    return <Redirect to='/' />
  }

  componentDidMount(){
    const { user } = this.props

    if (user === null) {
      return <Redirect to='/' />
    }
  }
  render (){
    const { user } = this.props

    return (
      <div>
        <Nav variant="tabs" defaultActiveKey="/">
          <Nav.Item>
              <NavLink to='/' exact className='nav-link' onClick={(e) => this.changeActive(e)}>
                Home
              </NavLink>
          </Nav.Item>
          <Nav.Item>
              <NavLink to='/add' className='nav-link' onClick={(e) => this.changeActive(e)}>
                New Question
              </NavLink>
          </Nav.Item>
          <Nav.Item>
              <NavLink to='/leaderboard' className='nav-link' onClick={(e) => this.changeActive(e)}>
                Leader Board
              </NavLink>
          </Nav.Item>
          <span className='ml-5'></span>
          <span className='ml-5'></span>
          <span className='ml-5'></span>
          { user !== null &&
            <div>
              <span>
                Hello, { user.name }
              </span>
              <img
                className='nav-image'
                src={ user.avatarURL }
                alt={`Avatar of ${user.name}`}
              />
            </div>
          }
          { user !== null &&
              <span className='logout' onClick={() => this.logout()}>
                Logout
              </span>
          }
        </Nav>
        <br />
      </div>
    )
  }
}

function mapStateToProps({users, authedUser}){
  const user = users[authedUser]
  return{
    user: user ? user : null
  }
}

export default withRouter(connect(mapStateToProps)(NavMenu))
