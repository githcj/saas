import { yulanType } from './userActionsType' 

const initState = {
    order:[]
}
function userReducer(state=initState, action) {
  switch(action.type) {
    case yulanType:
      return {
        order:action.order
      }
    default:
      return state
  }
}

export default userReducer