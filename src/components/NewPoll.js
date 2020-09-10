import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Card, Button } from 'react-bootstrap'
import { handleAddQuestion } from '../actions/shared.js'
import { withRouter } from 'react-router-dom'

class NewPoll extends Component {
  state = {
    optionOne: '',
    optionTwo: ''
  }
  handleChangeOptionOne = (e) => {
    const text = e.target.value

    this.setState(() => ({
      optionOne: text
    }))
  }
  handleChangeOptionTwo = (e) => {
    const text = e.target.value

    this.setState(() => ({
      optionTwo: text
    }))
  }
  addQuestion = (e) => {
    e.preventDefault();
    this.props.dispatch(handleAddQuestion(
      this.state.optionOne,
      this.state.optionTwo
    ))
    this.props.history.push('/')
  }
  render(){
    const { optionOne, optionTwo } = this.state
    return(
      <Card>
        <Card.Header>
          <span>
            Create New Question
          </span>
        </Card.Header>
        <Card.Body>
          <Card.Text>
            <span
              style={{fontSize: 14 + 'px'}}
            >
              Complete the question
            </span>
          </Card.Text>
          <Card.Title>Would you rather..</Card.Title>

          <input
            type='text'
            placeholder='Enter Option One Text Here'
            className='card-input'
            onChange={(e) => this.handleChangeOptionOne(e)}
          />
          <br />
          <span
            style={{fontWeight: 14 + 'px'}}
          >
            <strong>-- OR --</strong>
          </span>
          <br />
          <input
            type='text'
            placeholder='Enter Option Two Text Here'
            className='card-input'
            onChange={(e) => this.handleChangeOptionTwo(e)}
          />
          <br />
          <br />
          <Button
            variant="primary"
            disabled={optionOne === '' || optionTwo === ''}
            onClick={(e) => this.addQuestion(e)}
          >
            Submit
          </Button>
        </Card.Body>
        </Card>
    )
  }
}

export default withRouter(connect()(NewPoll))
