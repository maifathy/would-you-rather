import { RECEIVE_USERS, ADD_QUESTION_TO_USER, SAVE_QUESTION_ANSWER_TO_USER } from '../actions/users.js'

export default function users(state={}, action){
  switch (action.type){
    case RECEIVE_USERS:
      return {
        ...state,
        ...action.users
      }
    case ADD_QUESTION_TO_USER:
      const authedUser = action.question.author;
      return {
        ...state,
        [authedUser]: {
          ...state[authedUser],
          questions: state[authedUser].questions.concat([action.question.id])
        }
    }
    case SAVE_QUESTION_ANSWER_TO_USER:
      return {
        ...state,
        [action.authedUser]: {
          ...state[action.authedUser],
          answers: {
            ...state[action.authedUser].answers,
            [action.qid]: action.answer
          }
        }
    }
    default:
      return state
  }
}
