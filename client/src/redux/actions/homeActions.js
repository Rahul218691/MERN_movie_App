import {GLOBALTYPES} from './globalTypes';
import {getDataAPI} from '../../utils/fetchData';

export const HOMETYPES = {
	GET_BANNERS:"GET_BANNERS",
	GET_TRENDING:"GET_TRENDING"
}

export const getBanners = (auth) => async(dispatch) =>{
	try {
		dispatch({type:GLOBALTYPES.ALERT,payload:{loading:true}})
		const res = await getDataAPI('poster',auth.access_token);
		dispatch({
			type:HOMETYPES.GET_BANNERS,
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

export const getTrending = (auth,page) => async(dispatch) =>{
	try {
		dispatch({type:GLOBALTYPES.ALERT,payload:{loading:true}})
		const res = await getDataAPI(`trending?page=${page}`,auth.access_token);
		dispatch({
			type:HOMETYPES.GET_TRENDING,
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