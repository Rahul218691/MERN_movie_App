import {combineReducers} from 'redux';
import auth from './authReducer';
import alert from './alertReducer';
import home from './homeReducer';
import movies from './movieReducer';
import tvseries from './tvReducer';

export default combineReducers({
	auth,
	alert,
	home,
	movies,
	tvseries
});