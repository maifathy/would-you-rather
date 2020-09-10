export const RECEIVE_USERS = 'RECEIVE_USERS'
export const SAVE_QUESTION_ANSWER_TO_USER = 'SAVE_QUESTION_ANSWER_TO_USER'
export const ADD_QUESTION_TO_USER = 'ADD_QUESTION_TO_USER'

export function receiveUsers(users){
  return {
    type: RECEIVE_USERS,
    users
  }
}

export function addQuestionAnswerToUser({ authedUser, qid, answer }){
  return{
    type: SAVE_QUESTION_ANSWER_TO_USER,
    authedUser,
    qid,
    answer
  }
}

export function addQuestionToUser(question){
  return {
    type: ADD_QUESTION_TO_USER,
    question
  }
}
