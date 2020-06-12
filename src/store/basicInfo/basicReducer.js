import { editType } from './basicActionType' 

const initState = {
    editInfo:{}
}
function userReducer(state=initState, action) {
  switch(action.type) {
    case editType:
      return {
        edit:action.edit
      }
    default:
      return state
  }
}

export default userReducer