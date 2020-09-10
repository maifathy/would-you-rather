import React, { Component } from 'react'
import { connect } from 'react-redux'
import User from './User.js'

class Leaderboard extends Component {
  render(){
    return(
      <ol>
        {this.props.leadersIds.map((leaderId) =>
          <li key={leaderId}>
            <User id={leaderId} />
            <hr />
          </li>
        )}

      </ol>
    )
  }
}

function mapStateToProps({users}){
  const newUsers = Object.keys(users).map((id) => {
    return Object.assign(
      {},
      users[id],
      {
        count: users[id].questions.length + Object.keys(users[id].answers).length
      })
  })

  const leadersIds = Object.keys(newUsers).sort((a,b) =>
    newUsers[b].count - newUsers[a].count
  ).map((id) => { return newUsers[id].id })

  return{
    leadersIds
  }
}
export default connect(mapStateToProps)(Leaderboard)
