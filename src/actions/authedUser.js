export const SET_AUTH_USER = 'SET_AUTH_USER'
export const REMOVE_AUTH_USER = 'REMOVE_AUTH_USER'

export function receiveAuthUser(id){
  return{
    type: SET_AUTH_USER,
    id
  }
}

export function removeAuthUser(id){
  return{
    type: REMOVE_AUTH_USER,
    id
  }
}
