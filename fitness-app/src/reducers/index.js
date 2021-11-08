import { combineReducers } from 'redux';
import { loginReducer } from './loginReducer';
import { classesReducer } from './classesReducer';
import { reserveReducer } from './reserveReducer';

export default combineReducers({
    loginReducer,
    classesReducer,
    reserveReducer,
});
