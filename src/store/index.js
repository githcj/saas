import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

const mainReducer = combineReducers({
})

const store = createStore()

export default store