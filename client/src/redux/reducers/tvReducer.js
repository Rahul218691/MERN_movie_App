import {TVTYPES} from '../actions/tvActions';

const initialState = {
	banner:[],
	series:[],
	page:0,
	results:0
}

const tvReducer = (state=initialState,action) =>{
	switch(action.type){
		case TVTYPES.GET_TV_BANNERS:
			return {
				...state,
				banner:action.payload
			};
		case TVTYPES.GET_TVSERIES:
			return{
				...state,
				series:action.payload.series,
				page:action.payload.totalpages,
				results:action.payload.results
			}
		default:
			return state;
	}
}

export default tvReducer;