import { getInitialData, saveQuestion, saveQuestionAnswer } from '../utils/api.js'
import { receiveUsers, addQuestionAnswerToUser, addQuestionToUser } from '../actions/users.js'
import { receiveQuestions, addQuestionAnswer, addQuestion } from '../actions/questions.js'
import { showLoading, hideLoading } from 'react-redux-loading'

export default function handleInitialData(){
  return (dispatch) => {
    dispatch(showLoading())
    return getInitialData()
    .then(({ users, questions }) => {
      dispatch(receiveQuestions(questions))
      dispatch(receiveUsers(users))
      dispatch(hideLoading())
    })
  }
}

export function handleAddQuestion(optionOneText, optionTwoText){
  return (dispatch, getState) => {
    const { authedUser } = getState()
    dispatch(showLoading())
    const info = {
      optionOneText,
      optionTwoText,
      author: authedUser}
    saveQuestion(info)
    .then((question) => {
      dispatch(addQuestion(question))
      dispatch(addQuestionToUser(question))
    })
    .then(() => dispatch(hideLoading()))
  }
}

export function handleSaveQuestionAnswer(info){
  return (dispatch) => {
    dispatch(showLoading())
    saveQuestionAnswer(info)
    .then(() => {
      dispatch(addQuestionAnswer(info))
      dispatch(addQuestionAnswerToUser(info))
    })
    .then(() => dispatch(hideLoading()))
  }
}
