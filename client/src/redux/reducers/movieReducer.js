import {MOVIETYPES} from '../actions/movieActions';

const initialState = {
	banner:[],
	movies:[],
	page:0,
	results:0
}

const movieReducer = (state=initialState,action) =>{
	switch(action.type){
		case MOVIETYPES.GET_MOVIE_BANNERS:
			return {
				...state,
				banner:action.payload
			};
		case MOVIETYPES.GET_MOVIES:
			return{
				...state,
				movies:action.payload.movies,
				page:action.payload.totalpages,
				results:action.payload.results
			}
		default:
			return state;
	}
}

export default movieReducer;