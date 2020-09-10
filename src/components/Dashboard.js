import React, { Component } from 'react'
import { connect } from 'react-redux'
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'
import TabContent from 'react-bootstrap/TabContent'
import Poll from './Poll'

class Dashboard extends Component{

  render(){
    const { answeredIds, unansweredIds } = this.props
    return(
      <div className="container">
        <Tabs defaultActiveKey="unanswered">
          <Tab eventKey="unanswered" title="Unanswered">
            <TabContent>
              <ol>
                {unansweredIds.map((id, value) => (
                    <li key={id}>
                      <Poll id={id} view='view'/>
                      <hr/>
                    </li>
                  ))
                }
              </ol>
            </TabContent>
          </Tab>
          <Tab eventKey="answered" title="Answered">
            <TabContent>
              <ol>
                {answeredIds.map((id, value) => (
                    <li key={id}>
                      <Poll id={id} view='view'/>
                      <hr/>
                    </li>
                  ))
                }
              </ol>
            </TabContent>
          </Tab>
        </Tabs>
      </div>
    )
  }
}

function mapStateToProps({questions, authedUser}){
  const questionArray = Object.keys(questions).map((id) => { return questions[id] })

  const answeredIdsBeforeSort = questionArray.filter((question) => {
    return question.optionOne.votes.includes(authedUser)
    || question.optionTwo.votes.includes(authedUser)
  })

  const answeredIds = Object.keys(answeredIdsBeforeSort).sort((a,b) =>
  answeredIdsBeforeSort[b].timestamp - answeredIdsBeforeSort[a].timestamp)
  .map((id) => { return answeredIdsBeforeSort[id].id })

  const unansweredIdsBeforeSort = questionArray.filter((question) => {
    return !question.optionOne.votes.includes(authedUser)
    && !question.optionTwo.votes.includes(authedUser)
  })

  const unansweredIds = Object.keys(unansweredIdsBeforeSort).sort((a,b) =>
  unansweredIdsBeforeSort[b].timestamp - unansweredIdsBeforeSort[a].timestamp)
  .map((id) => { return unansweredIdsBeforeSort[id].id })

  return {
    answeredIds,
    unansweredIds
  }
}

export default connect(mapStateToProps)(Dashboard)
