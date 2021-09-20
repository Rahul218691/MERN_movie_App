import {HOMETYPES} from '../actions/homeActions';

const initialState = {
	banner:[],
	trending:[],
	page:0,
	results:0
}

const homeReducer = (state=initialState,action) =>{
	switch(action.type){
		case HOMETYPES.GET_BANNERS:
			return {
				...state,
				banner:action.payload
			};
		case HOMETYPES.GET_TRENDING:
			return{
				...state,
				trending:[...state.trending,...action.payload.trending],
				page:action.payload.totalpages,
				results:action.payload.results
			}
		default:
			return state;
	}
}

export default homeReducer;