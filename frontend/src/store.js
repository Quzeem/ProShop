import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

// Turns an object whose values are different reducer functions, into a single reducer function.
const reducer = combineReducers({})

// Anything we want to load when the redux store loads can be specify here
const initialState = {}

// List of middlewares to be used with redux
const middlewares = [thunk]

// create redux store
const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middlewares))
)

export default store
