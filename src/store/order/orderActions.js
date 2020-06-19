import { yulanType } from './orderActionsType'

export const yulanAction = (record,history)=> (
  {
    type: yulanType,
    record
  }
)

export const yulanActionSync = function(record,history) {
  return function(dispatch) {
    setTimeout(()=> {
      dispatch(yulanAction(record))
      history.push('')
    }, 200)
  }
}
