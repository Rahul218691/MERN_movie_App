import {getDataAPI} from '../../utils/fetchData';
import {GLOBALTYPES} from './globalTypes';


export const MOVIETYPES = {
	GET_MOVIE_BANNERS:"GET_MOVIE_BANNERS",
	GET_MOVIES:"GET_MOVIES"
}


export const getmovBanners = (auth) => async(dispatch) =>{
	try {
		dispatch({type:GLOBALTYPES.ALERT,payload:{loading:true}})
		const res = await getDataAPI('movieposter',auth.access_token);
		dispatch({
			type:MOVIETYPES.GET_MOVIE_BANNERS,
			payload:res.data
		});
		dispatch({type:GLOBALTYPES.ALERT,payload:{loading:false}})
	} catch(err) {
		dispatch({
			type:GLOBALTYPES.ALERT,
			payload:{
				error:err.response.data.msg
			}
		})			
	}
}