import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Card, Button, ProgressBar, Badge } from 'react-bootstrap'
import { formatQuestion } from '../utils/helpers.js'
import { handleSaveQuestionAnswer } from '../actions/shared.js'
import { withRouter } from 'react-router-dom'
import NotFound from './NotFound.js'

class Poll extends Component{
  state = {
    currentView: this.props.view,
    selectedAnswer: 'optionOne'
  }
  toQuestion = (e, id) => {
    e.preventDefault()
    this.props.history.push(`/questions/${id}`)
  }
  setSelectedAnswer = (answer) => {
    this.setState(() => ({
      selectedAnswer: answer
    }))
  }
  submit = (e, qid) => {
    e.preventDefault()
    const { authedUser } = this.props
    const { selectedAnswer } = this.state

    this.props.dispatch(handleSaveQuestionAnswer({
      authedUser,
      qid,
      answer: selectedAnswer
    }))
    this.setState(() => ({
      currentView: 'result'
    }))
  }
  render(){
    if(this.props.question === null)
      return <NotFound />

    const { id, optionOne, optionTwo, avatarURL, name } = this.props.question
    const { resultOption, optionOneRatio, optionTwoRatio, winnerOption } = this.props
    const { currentView } = this.state
    return (
        <Card>
          <Card.Header>{name}
            { currentView === 'submit'  || currentView === 'view'
              ? ' asks:'
              : ' asked:'
            }
          </Card.Header>
          <Card.Body>
            <Card.Img
              className='card-image-poll'
              variant="top"
              src={ avatarURL }
              alt={`Avatar of ${name}`}
            />
            { currentView === 'view' &&
              <Card.Title><strong>Would you rather</strong></Card.Title>
            }
            { currentView === 'view' &&
              <Card.Text>
                { optionOne.text }
              </Card.Text>
            }
            { currentView === 'submit' &&
              <Card.Title><strong>Would you rather ...</strong></Card.Title>
            }
            { currentView === 'submit' &&
              <Card.Text>
                <input
                  name='options'
                  type='radio'
                  checked
                  value={ optionOne.text }
                  onChange={() => this.setSelectedAnswer('optionOne')}
                ></input>
                <label style={{ paddingLeft: 3 + 'px' }}>{ optionOne.text }</label>
                <br />
                <input
                  name='options'
                  type='radio'
                  value={ optionTwo.text }
                  onChange={() => this.setSelectedAnswer('optionTwo')}
                ></input>
                <label style={{ paddingLeft: 3 + 'px' }}>{ optionTwo.text }</label>
              </Card.Text>
            }
            { currentView === 'result' &&
              <Card.Title><strong>Results: </strong></Card.Title>
            }
            { currentView === 'result' &&
              <div>
                <Card
                  bg={ winnerOption === 1 ? 'success' : '' }
                  className='mb-2'
                  style={{padding: 5 + 'px'}}
                >
                  { resultOption === 1 &&
                    <Badge
                      id='badge-vote'
                      variant="warning"
                      pill
                      >
                      Your vote
                    </Badge>
                  }
                  <label>Would you rather {optionOne.text}?</label>
                  <ProgressBar animated now={optionOneRatio} label={`${optionOneRatio}%`}/>
                  <label align='center'>
                    <strong>
                      {optionOne.votes.length} out of {optionOne.votes.length + optionTwo.votes.length} votes
                    </strong>
                  </label>
                </Card>

                <Card
                  bg={ winnerOption === 2 ? 'success' : '' }
                  className='mb-2'
                  style={{padding: 5 + 'px'}}
                >
                  { resultOption === 2 &&
                    <Badge
                      id='badge-vote'
                      variant="warning"
                      pill
                      >
                      Your vote
                    </Badge>
                  }
                  <label>Would you rather {optionTwo.text}?</label>
                  <ProgressBar animated now={optionTwoRatio} label={`${optionTwoRatio}%`}/>
                  <label align='center'>
                    <strong>
                      {optionTwo.votes.length} out of {optionOne.votes.length + optionTwo.votes.length} votes
                    </strong>
                  </label>
                </Card>
              </div>
            }
            { currentView === 'view' &&
              <Button variant="primary" onClick={(e) => this.toQuestion(e, id)}>View Poll</Button>
            }
            { currentView === 'submit' &&
              <Button variant="primary" onClick={(e) => this.submit(e, id)}>Submit</Button>
            }
          </Card.Body>
        </Card>
    )
  }
}

function mapStateToProps({questions, users, authedUser}, props){
  if(authedUser === null)
    return{
      authedUser: null,
      question: null
    }
  const { id } = props.id ? props : props.match.params
  const { dispatch } = props
  let { view } = props
  let newView = 'view'
  let resultOption = 1
  let winnerOption = 0
  let optionOneRatio = 0
  let optionTwoRatio = 0
  const question = questions[id]

  if((view !== 'view' || view === undefined) && question !== undefined){
    if (question.optionOne.votes.includes(authedUser)){
      newView = 'result'
      resultOption = 1
    }
    else if (question.optionTwo.votes.includes(authedUser)){
      newView = 'result'
      resultOption = 2
    }
    else newView = 'submit'
    if(newView === 'result'){
      optionOneRatio =
      (question.optionOne.votes.length
        / (question.optionOne.votes.length + question.optionTwo.votes.length))
        * 100
      optionTwoRatio =
      (question.optionTwo.votes.length
        / (question.optionOne.votes.length + question.optionTwo.votes.length))
        * 100
      if(optionOneRatio > optionTwoRatio)
        winnerOption = 1
      else if(optionTwoRatio > optionOneRatio)
        winnerOption = 2
    }
  }
  view = newView
  return{
    authedUser,
    view,
    resultOption,
    winnerOption,
    optionOneRatio,
    optionTwoRatio,
    dispatch,
    question: question ? formatQuestion(question, users[question.author]) : null
  }
}

export default withRouter(connect(mapStateToProps)(Poll))
