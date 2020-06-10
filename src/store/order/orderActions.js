import { yulanType } from './orderActionsType'

export const yulanAction = (record)=> (
  {
    type: yulanType,
    order: record
  }
)

