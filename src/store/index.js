import { createStore, combineReducers, applyMiddleware } from 'redux'
import userReducer from './user/userReducer'
import thunk from 'redux-thunk'

const mainReducer = combineReducers({
  userReducer,
})

const store = createStore(
    mainReducer,
    applyMiddleware(thunk),
    // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
)

export default store