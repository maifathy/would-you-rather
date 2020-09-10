import React, { Component } from 'react'
import { Card, Dropdown } from 'react-bootstrap'
import logo from '../logo.svg'
import { connect } from 'react-redux'
import { receiveAuthUser } from '../actions/authedUser.js'

class Login extends Component{
  createDDLItems = () => {
    let items = []
    Object.keys(this.props.users).map((id) => {
      return items.push(<Dropdown.Item id={id} key={id} onClick={(e) => this.doLogin(e)}>{ this.props.users[id].name }</Dropdown.Item>)
    })
    return items
  }

  doLogin = (e) => {
    const authedUser = e.target.id

    this.props.dispatch(receiveAuthUser(authedUser))
    this.props.history.push('/')
  }
  render(){
    return(
      <Card>
        <Card.Header align='center'>
          <span>
            Welcome to the Would You Rather App!
          </span>
          <br />
          Please sign in to continue
        </Card.Header>
        <Card.Body align='center'>
        <Card.Img
          align='center'
          className='logo'
          variant="top"
          src={ logo }
          alt={`Logo of Would You Rather App`}
        />
        <Card.Text align='center'>
          <span style={{ color: '#0080008c'}}>
            <strong>Login</strong>
          </span>
        </Card.Text>
        <Dropdown>
          <Dropdown.Toggle>
            Select User
          </Dropdown.Toggle>
          <Dropdown.Menu>
            { this.createDDLItems() }
          </Dropdown.Menu>
        </Dropdown>
        </Card.Body>
      </Card>
    )
  }
}

function mapStateToProps({ users, authedUser }){
  return{
    authedUser,
    users
  }
}
export default connect(mapStateToProps)(Login)
