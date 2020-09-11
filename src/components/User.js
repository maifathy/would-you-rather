import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Card } from 'react-bootstrap'

const User = (props) => {
  const { user } = props
  return(
    <Card>
      <Card.Body>
        <Card.Img
          className='card-image'
          variant="top"
          src={ user.avatarURL }
          alt={`Avatar of ${ user.name }`}
        />

      <div className='card-text-leader'>
        <span>
          {user.name}
        </span>
        <br />
        <br />
        Answered questions
        <span className='ml-5'></span>
        <span className='ml-5'></span>
        { Object.keys(user.answers).length }
        <hr />
        Created questions
        <span className='ml-5'></span>
        <span className='ml-5'></span>
        <span className='ml-3 .ml-sm-0'></span>
        { user.questions.length }
      </div>
      <Card className='card-score'>
        <Card.Header
          align='center'
        >
          Score
        </Card.Header>
        <Card.Body
          align='center'
        >
          <div className='score' align='center'>
            { Object.keys(user.answers).length + user.questions.length }
          </div>
        </Card.Body>
      </Card>
      </Card.Body>

    </Card>
  )
}
function mapStateToProps({ users }, { id }){
  const user = users[id]
  return {
    user: user ? user : null
  }
}

export default connect(mapStateToProps)(User)
