import { loginType, logoutType } from './userActionsType'

export const loginAction = (user)=> (
  {
    type: loginType,
    username: user.username,
    token: user.token
  }
)

export const loginActionSync = function(user, history) {
  return function(dispatch) {
    setTimeout(()=> {
      dispatch(loginAction(user))
      history.push('/home')
    }, 200)
  }
}

export const logoutAction = ()=> (
  function(){
    localStorage.removeItem("token")
    this.props.history.push({
        pathname:  "/login",
      })
  }
)