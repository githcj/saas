import { loginType, logoutType } from './userActionsType' 

const initState = {
  username: '',
  token: ''
}
function userReducer(state=initState, action) {
  switch(action.type) {
    case loginType:
      return {
        username: action.username,
        token: action.token
      }
    case logoutType: 
      return {
        username: '',
        token: ''
      }
    default:
      return state
  }
}

export default userReducer