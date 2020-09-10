import { SET_AUTH_USER } from '../actions/authedUser.js'
import { REMOVE_AUTH_USER } from '../actions/authedUser.js'

export default function authedUser(state=null, action){
  switch (action.type) {
    case SET_AUTH_USER:
      return action.id
    case REMOVE_AUTH_USER:
      return action.id
    default:
      return state
  }
}
