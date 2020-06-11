import { yulanType } from './basicActionType' 

const initState = {
    wxImg:'',
    logo:'',
    companyImgs:[]
}
function userReducer(state=initState, action) {
  switch(action.type) {
    case wxImgType:
      return {
        order:action.order
      }
    default:
      return state
  }
}

export default userReducer