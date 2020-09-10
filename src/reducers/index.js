import { combineReducers } from 'redux'
import users from './users.js'
import questions from './questions.js'
import authedUser from './authedUser.js'
import { loadingBarReducer } from 'react-redux-loading'

export default combineReducers({
  users,
  questions,
  authedUser,
  loadingBar: loadingBarReducer
})
