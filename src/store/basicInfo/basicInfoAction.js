import { editType } from './basicActionType'

export const editAction = (editInfo)=> (
  {
      type: editType,
      editInfo
  }
)

