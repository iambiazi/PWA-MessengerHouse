import { combineReducers } from 'redux';

import messages from './messageReducer';
import houses from './houseReducer';

export default combineReducers({ messages, houses });
