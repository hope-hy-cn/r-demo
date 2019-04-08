import { combineReducers } from 'redux'

import notification from './notification'
import user from './user'

export default combineReducers({
  notification,
  user
})

