import {
    createStore, applyMiddleware, combineReducers, bindActionCreators,
  } from 'redux'
  import { composeWithDevTools } from 'redux-devtools-extension'
  import thunkMiddleware from 'redux-thunk'


import {initialStateReducer} from './reducers/main'

export const initialState = {
  user: {
    firstName: null
  }
}

const reducers = combineReducers({
  user: initialStateReducer,
})

export default () => createStore(
  reducers,
  initialState,
  composeWithDevTools(applyMiddleware(thunkMiddleware)),
)
