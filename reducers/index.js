import { combineReducers } from 'redux';

import messages from './messageReducer';
import houses from './houseReducer';
import user from './userReducer';

export default combineReducers({ messages, houses, user });
